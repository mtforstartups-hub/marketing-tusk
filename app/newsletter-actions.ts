"use server";

import * as z from "zod";
import { env } from "@/env";
import { generateNewsletterEmailHtml } from "@/lib/email-templates";
import { appendRow, ensureSheetTab } from "@/lib/google-sheets";
import { sendAdminEmail } from "@/lib/mailer";

export type NewsletterFormState = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

const NEWSLETTER_HEADERS = ["Timestamp", "Email", "Source"];

const newsletterSchema = z.object({
  email: z.email("Invalid email address"),
  source: z.string().max(200).optional(),
});

async function appendNewsletterToSheet(email: string, source: string) {
  // The newsletter lives on its own tab so it never mixes with contact
  // enquiries. The tab (and its header row) is created on first use.
  await ensureSheetTab(env.NEWSLETTER_SHEET_TAB, NEWSLETTER_HEADERS);

  const rowData = [
    new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
    email,
    source,
  ];

  await appendRow(`${env.NEWSLETTER_SHEET_TAB}!A:C`, rowData);
}

export default async function subscribeNewsletter(
  _prevState: NewsletterFormState,
  formData: FormData,
): Promise<NewsletterFormState> {
  const raw = Object.fromEntries(formData);

  // Honeypot: real users never see this field. Return success anyway so bots
  // do not learn that they were caught, but write nothing.
  if (typeof raw.website === "string" && raw.website.trim().length > 0) {
    return { success: true, message: "Thanks for subscribing!", errors: {} };
  }

  const parsed = newsletterSchema.safeParse({
    email: typeof raw.email === "string" ? raw.email.trim() : raw.email,
    source: typeof raw.source === "string" ? raw.source : undefined,
  });

  if (!parsed.success) {
    return {
      success: false,
      message: "Please enter a valid email address.",
      errors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  const { email } = parsed.data;
  const source = parsed.data.source ?? "unknown";

  try {
    const emailPromise = sendAdminEmail({
      subject: `New Newsletter Subscriber: ${email}`,
      html: generateNewsletterEmailHtml({ email, source }),
      replyTo: email,
    });

    const sheetPromise = appendNewsletterToSheet(email, source);

    // Same pattern as the contact form: one failing sink must not lose the
    // other. Only fail the request when both sides failed.
    const [emailResult, sheetResult] = await Promise.allSettled([
      emailPromise,
      sheetPromise,
    ]);

    if (emailResult.status === "rejected") {
      console.error("Newsletter: email notification failed", emailResult.reason);
    }
    if (sheetResult.status === "rejected") {
      console.error("Newsletter: sheet append failed", sheetResult.reason);
    }

    if (emailResult.status === "rejected" && sheetResult.status === "rejected") {
      throw new Error("Both newsletter email and sheet backup failed.");
    }

    return {
      success: true,
      message: "Thanks for subscribing!",
      errors: {},
    };
  } catch (error) {
    console.error("Newsletter subscription failed:", error);
    return {
      success: false,
      message: "Something went wrong. Please try again later.",
      errors: {},
    };
  }
}
