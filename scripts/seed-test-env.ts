/**
 * Seeds `.env.test` for the Playwright suite from the Vercel Preview scope.
 *
 * Only the keys the tests actually read are copied, so the test process never
 * holds the Gmail refresh token, admin password, Postgres URL or Sanity token.
 *
 * Run in CI after `vercel pull`:
 *   bun run scripts/seed-test-env.ts
 */

import fs from "fs";
import dotenv from "dotenv";

const SOURCE = ".vercel/.env.preview.local";
const TARGET = ".env.test";

/** Everything the E2E suite reads from the app's own configuration. */
const ALLOWED = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "SPREADSHEET_ID",
] as const;

function fail(message: string): never {
  // `::error::` surfaces the message as an annotation on the Actions run.
  console.error(`::error::${message}`);
  process.exit(1);
}

if (!fs.existsSync(SOURCE)) {
  fail(`${SOURCE} not found — run \`vercel pull\` before this script.`);
}

const source = dotenv.parse(fs.readFileSync(SOURCE));

const missing = ALLOWED.filter((key) => !source[key]);
if (missing.length > 0) {
  fail(
    `Missing from the Vercel Preview scope: ${missing.join(", ")}. ` +
      `Add them under Project Settings > Environment Variables (Preview).`,
  );
}

const origin = process.env.PREVIEW_ORIGIN;
if (!origin) fail("PREVIEW_ORIGIN is not set.");

const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
if (!bypass) fail("VERCEL_AUTOMATION_BYPASS_SECRET is not set.");

// JSON.stringify keeps a multi-line value (the private key) on a single line
// with \n escapes, which dotenv parses back into exactly the same string.
const lines = ALLOWED.map((key) => `${key}=${JSON.stringify(source[key])}`);

lines.push(`PLAYWRIGHT_BASE_URL=${JSON.stringify(origin)}`);
lines.push(`VERCEL_AUTOMATION_BYPASS_SECRET=${JSON.stringify(bypass)}`);

fs.writeFileSync(TARGET, lines.join("\n") + "\n");

// A malformed key is the most common cause of a silent sheets failure, and it
// otherwise only shows up as a Google auth error minutes later.
const key = source.GOOGLE_PRIVATE_KEY ?? "";
if (!key.includes("BEGIN") || !key.includes("END")) {
  console.warn(
    `::warning::GOOGLE_PRIVATE_KEY does not look like a PEM block. ` +
      `Sheets calls will fail to authenticate.`,
  );
}

console.log(`Wrote ${TARGET} with ${lines.length} keys: ${ALLOWED.join(", ")}`);
