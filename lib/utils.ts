import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { google } from "googleapis";
import { env } from "@/env";
import nodemailer from "nodemailer";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function appendToGoogleSheet(data: any) {
  // Set up the OAuth2 client for Google APIs
  const oauth2Client = new google.auth.OAuth2(env.CLIENT_ID, env.CLIENT_SECRET);

  oauth2Client.setCredentials({
    refresh_token: env.REFRESH_TOKEN,
  });

  const sheets = google.sheets({ version: "v4", auth: oauth2Client });

  // Map your validated data to an array.
  // The order here MUST match the columns in your Google Sheet.
  const rowData = [
    new Date().toISOString(), // Column A: Date
    data.name, // Column B: Name
    data.email, // Column C: Email
    data.phone, // Column D: Message (or whatever fields you have)
    data.company,
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId: env.SPREADSHEET_ID,
    range: "Sheet1!A:E", // Change "Sheet1" if your tab has a different name
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [rowData],
    },
  });
}

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: env.EMAIL_USER,
    clientId: env.CLIENT_ID,
    clientSecret: env.CLIENT_SECRET,
    refreshToken: env.REFRESH_TOKEN,
  },
});
