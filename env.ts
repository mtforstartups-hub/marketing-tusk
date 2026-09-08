import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  ADMIN_EMAIL: z
    .string({ error: "ADMIN_EMAIL must be a string" })
    .min(1, { error: "ADMIN_EMAIL is required" })
    .transform((str) => str.split(",").map((email) => email.trim()))
    .pipe(z.array(z.email({ error: "One or more admin emails are invalid" }))),

  EMAIL_USER: z.email({ error: "EMAIL_USER must be a valid email" }),
  CLIENT_ID: z.string({ error: "CLIENT_ID needed" }),
  CLIENT_SECRET: z.string({ error: "CLIENT_SECRET needed" }),
  REFRESH_TOKEN: z.string({ error: "REFRESH_TOKEN needed" }),
  SPREADSHEET_ID: z.string({ error: "SPREADSHEET_ID needed" }),
  TURNSTILE_SECRET: z.string({ error: "TURNSTILE_SECRET needed" }),
  TURNSTILE_HOSTNAMES: z.string({ error: "TURNSTILE_HOSTNAMES needed" }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("❌ Invalid environment variables:");
  // Zod 4 standard for logging flat errors
  console.error(z.flattenError(parsedEnv.error).fieldErrors);
  process.exit(1);
}

export const env = parsedEnv.data;
