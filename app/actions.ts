"use server";

import { generateAdminEmailHtml } from "@/lib/email-templates";
import * as z from "zod";
import { env } from "@/env";
import nodemailer from "nodemailer";
import { google } from "googleapis";

// 1. Define the base fields that apply to EVERY role
const baseFields = {
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  // Handle empty strings from FormData for optional/regex fields
  phone: z
    .union([
      z.string().regex(/^\+?[1-9]\d{1,14}$/, "Invalid mobile number"),
      z.literal(""),
    ])
    .optional(),
  company: z.string().optional(),
  message: z.string().optional(),
};

// 2. Create a discriminated union based on the "role" field
const contactFormSchema = z.discriminatedUnion("role", [
  z.object({
    ...baseFields,
    role: z.literal("founder", {
      error: () => "Please select a valid role", // Zod 4 uses `error` instead of `errorMap`
    }),
    fundingStage: z
      .array(z.string())
      .min(1, "Please select at least one funding stage"),
    teamSize: z.string().min(1, "Please select a team size"),
    sector: z.string().min(1, "Please select an industry/sector"),
  }),
  z.object({
    ...baseFields,
    role: z.literal("investor"),
    investmentRange: z.string().min(1, "Please select an investment range"),
    // investmentStage: z.string().min(1, "Please select an investment stage"),
    investmentStage: z
      .array(z.string())
      .min(1, "Please select at least one investment stage"),
    sectorsOfInterest: z.string().min(1, "Please specify sectors of interest"),
  }),
  z.object({
    ...baseFields,
    role: z.literal("enabler"),
    organizationType: z.string().min(1, "Please select an organization type"),
    programType: z.string().min(1, "Please select a program type"),
    supportServices: z.string().min(1, "Please specify support services"),
  }),
]);

export type ContactFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

/**
 * Appends a validated contact form submission as a single row to a Google Sheets spreadsheet.
 *
 * The row covers columns A through P and includes a localized timestamp (en-IN, Asia/Kolkata),
 * shared fields (name, email, phone, company, role, message), and role-specific columns.
 * For the "founder" and "investor" roles, multi-select arrays (`fundingStage`, `investmentStage`)
 * are serialized as comma-separated strings. The function uses Google OAuth2 credentials from
 * environment variables and writes to the spreadsheet identified by `env.SPREADSHEET_ID`.
 *
 * @param data - Validated contact form data conforming to `contactFormSchema`
 */
export async function appendToGoogleSheet(
  data: z.infer<typeof contactFormSchema>,
) {
  const oauth2Client = new google.auth.OAuth2(env.CLIENT_ID, env.CLIENT_SECRET);

  oauth2Client.setCredentials({
    refresh_token: env.REFRESH_TOKEN,
  });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });

  // Map ALL possible form fields to specific array indexes (columns)
  const rowData = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }), // Better readable timestamp
    data.name || "",
    data.email || "",
    data.phone || "",
    data.company || "",
    data.role || "",
    data.message || "",
    // Founder Fields
    data.role === "founder" ? data.fundingStage.join(", ") : "",
    (data.role === "founder" ? data.teamSize : "") || "",
    (data.role === "founder" ? data.sector : "") || "",
    // Investor Fields
    (data.role === "investor" ? data.investmentRange : "") || "",
    data.role === "investor" ? data.investmentStage.join(", ") : "",
    (data.role === "investor" ? data.sectorsOfInterest : "") || "",
    // Enabler Fields
    (data.role === "enabler" ? data.organizationType : "") || "",
    (data.role === "enabler" ? data.programType : "") || "",
    (data.role === "enabler" ? data.supportServices : "") || "",
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.SPREADSHEET_ID,
    // Expanded range to cover A through P (16 columns)
    range: "Sheet1!A:P",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowData],
    },
  });
}

/**
 * Handle a contact form submission by validating input, sending an admin email, and appending the submission to Google Sheets.
 *
 * Attempts to validate the provided form data against the contact form schema, then concurrently sends an admin notification email and saves the submission to Google Sheets. If validation fails, returns the validation errors. If both the email and the sheet backup fail, returns a failure result; if at least one operation succeeds, returns a success result.
 *
 * @param prevState - Previous contact form state (accepted for signature compatibility; not used)
 * @param formData - The submitted FormData object containing the form fields
 * @returns The resulting ContactFormState indicating overall success, a user-facing message, and optional field-level errors when validation fails
 */
export default async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = {
    ...Object.fromEntries(formData),
    fundingStage: formData.getAll("fundingStage"),
    investmentStage: formData.getAll("investmentStage"),
  };

  const validatedFields = contactFormSchema.safeParse(result);

  if (!validatedFields.success) {
    const fieldErrors = z.flattenError(validatedFields.error).fieldErrors;

    return {
      success: false,
      message: "Please fix the errors in the form.",
      errors: fieldErrors,
    };
  }

  try {
    const htmlContent = generateAdminEmailHtml(validatedFields.data);

    const mailOptions = {
      from: `"Marketing Tusk Website" <${env.EMAIL_USER}>`,
      to: env.ADMIN_EMAIL,
      replyTo: validatedFields.data.email,
      subject: `New Contact Submission from ${validatedFields.data.name}`,
      html: htmlContent,
    };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: env.EMAIL_USER,
        clientId: env.CLIENT_ID,
        clientSecret: env.CLIENT_SECRET,
        refreshToken: env.REFRESH_TOKEN,
      },
    });

    // Run both tasks in parallel
    const emailPromise = transporter.sendMail(mailOptions);
    const sheetPromise = appendToGoogleSheet(validatedFields.data);

    // Wait for both to finish, regardless of success/failure
    const [emailResult, sheetResult] = await Promise.allSettled([
      emailPromise,
      sheetPromise,
    ]);

    // Error logging for your server console
    if (emailResult.status === "rejected") {
      console.error("Critical: Email failed to send", emailResult.reason);
    }
    if (sheetResult.status === "rejected") {
      console.error(
        "Warning: Failed to save to Google Sheets",
        sheetResult.reason,
      );
    }

    // If BOTH failed, tell the user there was an error
    if (
      emailResult.status === "rejected" &&
      sheetResult.status === "rejected"
    ) {
      throw new Error("Both email and sheet backup failed.");
    }

    return {
      success: true,
      message: "Your message has been sent successfully!",
      errors: {},
    };
  } catch (error) {
    console.error("Failed to send data:", error);
    return {
      success: false,
      message:
        "An error occurred while sending your message. Please try again later.",
      errors: {},
    };
  }
}
