import nodemailer from "nodemailer";
import { env } from "@/env";

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null =
  null;

export function getMailTransporter(): ReturnType<
  typeof nodemailer.createTransport
> {
  if (cachedTransporter) return cachedTransporter;

  cachedTransporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: env.EMAIL_USER,
      clientId: env.CLIENT_ID,
      clientSecret: env.CLIENT_SECRET,
      refreshToken: env.REFRESH_TOKEN,
    },
  });

  return cachedTransporter;
}

/**
 * Sends an internal notification to the admin address(es) in ADMIN_EMAIL.
 */
export async function sendAdminEmail({
  subject,
  html,
  replyTo,
}: {
  subject: string;
  html: string;
  replyTo?: string;
}) {
  return getMailTransporter().sendMail({
    from: `"Marketing Tusk Website" <${env.EMAIL_USER}>`,
    to: env.ADMIN_EMAIL,
    replyTo,
    subject,
    html,
  });
}
