"use server";

import { generateAdminEmailHtml } from "@/lib/email-templates";
import * as z from "zod";
import { env } from "@/env";
import { appendToGoogleSheet, transporter } from "@/lib/utils";

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
    fundingStage: z.string().min(1, "Please select a funding stage"),
    teamSize: z.string().min(1, "Please select a team size"),
    sector: z.string().min(1, "Please select an industry/sector"),
  }),
  z.object({
    ...baseFields,
    role: z.literal("investor"),
    investmentRange: z.string().min(1, "Please select an investment range"),
    investmentStage: z.string().min(1, "Please select an investment stage"),
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

export default async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = Object.fromEntries(formData);

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
