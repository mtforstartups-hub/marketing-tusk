import { google } from "googleapis";
import { env } from "@/env";
import { normalizePrivateKey } from "@/lib/private-key";

type SheetsClient = ReturnType<typeof google.sheets>;

let cachedClient: SheetsClient | null = null;

/**
 * Authenticates with a Google service account instead of a user OAuth2
 * refresh token. Service accounts do not expire, so this removes the most
 * common cause of silent sheet failures in production.
 *
 * The spreadsheet must be shared with GOOGLE_SERVICE_ACCOUNT_EMAIL
 * (Editor access) for writes to succeed.
 */
export function getSheetsClient(): SheetsClient {
  if (cachedClient) return cachedClient;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: normalizePrivateKey(env.GOOGLE_PRIVATE_KEY),
    },
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  cachedClient = google.sheets({ version: "v4", auth });
  return cachedClient;
}

// Tabs we have already verified/created in this instance's lifetime.
const ensuredTabs = new Set<string>();

/**
 * Creates the tab (and writes its header row) if it does not exist yet.
 * Safe to call before every write — the result is cached per instance.
 */
export async function ensureSheetTab(
  tabName: string,
  headers: string[],
  spreadsheetId: string = env.SPREADSHEET_ID,
): Promise<void> {
  const cacheKey = `${spreadsheetId}:${tabName}`;
  if (ensuredTabs.has(cacheKey)) return;

  const sheets = getSheetsClient();

  try {
    const meta = await sheets.spreadsheets.get({
      spreadsheetId,
      fields: "sheets.properties.title",
    });

    const exists = (meta.data.sheets ?? []).some(
      (sheet) => sheet.properties?.title === tabName,
    );

    if (!exists) {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId,
        requestBody: {
          requests: [{ addSheet: { properties: { title: tabName } } }],
        },
      });

      await sheets.spreadsheets.values.update({
        spreadsheetId,
        range: `${tabName}!A1`,
        valueInputOption: "RAW",
        requestBody: { values: [headers] },
      });
    }
  } catch (error) {
    // A concurrent request may have created the tab first. The append that
    // follows still succeeds, so this is not fatal.
    console.warn(`Could not ensure sheet tab "${tabName}":`, error);
  }

  ensuredTabs.add(cacheKey);
}

/**
 * Appends a single row to an explicit range, e.g. "Sheet1!A:P".
 */
export async function appendRow(
  range: string,
  values: (string | number)[],
  spreadsheetId: string = env.SPREADSHEET_ID,
): Promise<void> {
  const sheets = getSheetsClient();

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    requestBody: { values: [values] },
  });
}
