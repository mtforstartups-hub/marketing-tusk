"use server";

import { generateAdminEmailHtml } from "@/lib/email-templates";
import * as z from "zod";
import { env } from "@/env";
import { appendRow } from "@/lib/google-sheets";
import { sendAdminEmail } from "@/lib/mailer";

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

export async function appendToGoogleSheet(
  data: z.infer<typeof contactFormSchema>,
) {
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
    (data.role === "founder" ? data.fundingStage : "") || "",
    (data.role === "founder" ? data.teamSize : "") || "",
    (data.role === "founder" ? data.sector : "") || "",
    // Investor Fields
    (data.role === "investor" ? data.investmentRange : "") || "",
    (data.role === "investor" ? data.investmentStage : "") || "",
    (data.role === "investor" ? data.sectorsOfInterest : "") || "",
    // Enabler Fields
    (data.role === "enabler" ? data.organizationType : "") || "",
    (data.role === "enabler" ? data.programType : "") || "",
    (data.role === "enabler" ? data.supportServices : "") || "",
  ];

  await appendRow("Sheet1!A:P", rowData);
}

export default async function submitContactForm(
  prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const result = Object.fromEntries(formData);

  // Turnstile Verification
  const token = formData.get("cf-turnstile-response");
  const expectedAction = "contact";
  const expectedHostnames = new Set(
    (env.TURNSTILE_HOSTNAMES ?? "")
      .split(",")
      .map((hostname) => hostname.trim())
      .filter(Boolean),
  );

  if (
    typeof token !== "string" ||
    token.length === 0 ||
    token.length > 2048 ||
    expectedHostnames.size === 0
  ) {
    return {
      success: false,
      message: "Security verification failed. Please try again.",
    };
  }

  let turnstileResult;
  try {
    const r = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        signal: AbortSignal.timeout(10_000),
        body: new URLSearchParams({
          secret: env.TURNSTILE_SECRET,
          response: token,
        }),
      },
    );
    if (!r.ok) throw new Error(`siteverify ${r.status}`);
    turnstileResult = await r.json();
  } catch (err) {
    console.error("Turnstile fetch error:", err);
    return {
      success: false,
      message: "Security verification failed. Please try again.",
    };
  }

  if (!turnstileResult.success) {
    console.error(
      "[Turnstile] success=false. error-codes:",
      turnstileResult["error-codes"],
      "| full result:",
      JSON.stringify(turnstileResult),
    );
    return {
      success: false,
      message: "Security verification failed. Please try again.",
    };
  }

  // Only check action and hostname if not using the Cloudflare dummy testing key
  const isTestingKey = env.TURNSTILE_SECRET === "1x0000000000000000000000000000000AA";

  if (!isTestingKey) {
    if (turnstileResult.action !== expectedAction) {
      console.error(
        `[Turnstile] action mismatch: expected="${expectedAction}", got="${turnstileResult.action}"`,
      );
      return {
        success: false,
        message: "Security verification failed. Please try again.",
      };
    }

    if (!expectedHostnames.has(turnstileResult.hostname)) {
      console.error(
        `[Turnstile] hostname mismatch: got="${turnstileResult.hostname}", allowed=${JSON.stringify([...expectedHostnames])}`,
      );
      return {
        success: false,
        message: "Security verification failed. Please try again.",
      };
    }
  }

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

    // Run both tasks in parallel
    const emailPromise = sendAdminEmail({
      subject: `New Contact Submission from ${validatedFields.data.name}`,
      html: htmlContent,
      replyTo: validatedFields.data.email,
    });
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
