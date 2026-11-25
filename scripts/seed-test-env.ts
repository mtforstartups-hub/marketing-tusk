/**
 * Seeds `.env.test` for the Playwright suite from the Vercel Preview scope.
 *
 * Only the keys the tests actually read are copied, so the test process never
 * holds the Gmail refresh token, admin password, Postgres URL or Sanity token.
 *
 * Run in CI after `vercel pull`:
 *   bun run scripts/seed-test-env.ts
 *
 * A Vercel variable marked "Sensitive" cannot be read back — `vercel pull`
 * writes the literal string `[SENSITIVE]` instead of the value. Any allowlisted
 * key in that state can be supplied out of band with a GitHub secret named
 * `E2E_<KEY>`, which takes precedence over the pulled value.
 */

import { createPrivateKey } from "node:crypto";
import fs from "fs";
import dotenv from "dotenv";
import { normalizePrivateKey } from "../lib/private-key";

const SOURCE = ".vercel/.env.preview.local";
const TARGET = ".env.test";

/** Everything the E2E suite reads from the app's own configuration. */
const ALLOWED = [
  "GOOGLE_SERVICE_ACCOUNT_EMAIL",
  "GOOGLE_PRIVATE_KEY",
  "SPREADSHEET_ID",
] as const;

const SENSITIVE_PLACEHOLDER = "[SENSITIVE]";

function fail(message: string): never {
  // `::error::` surfaces the message as an annotation on the Actions run.
  console.error(`::error::${message}`);
  process.exit(1);
}

if (!fs.existsSync(SOURCE)) {
  fail(`${SOURCE} not found — run \`vercel pull\` before this script.`);
}

const fromVercel = dotenv.parse(fs.readFileSync(SOURCE));
const resolved: Record<string, string> = {};
const problems: string[] = [];

for (const name of ALLOWED) {
  // A GitHub secret wins: it is the only way to supply a Sensitive value.
  const override = process.env[`E2E_${name}`]?.trim();
  const value = override || fromVercel[name] || "";

  if (!value) {
    problems.push(`${name} is missing from the Vercel Preview scope.`);
    continue;
  }

  if (value === SENSITIVE_PLACEHOLDER) {
    problems.push(
      `${name} is marked Sensitive in Vercel, so \`vercel pull\` returns ` +
        `"${SENSITIVE_PLACEHOLDER}" instead of the value. Either clear the Sensitive ` +
        `flag for this variable in the Preview scope, or add a GitHub secret named ` +
        `E2E_${name} holding the real value.`,
    );
    continue;
  }

  resolved[name] = value;
}

if (problems.length > 0) fail(problems.join(" "));

const origin = process.env.PREVIEW_ORIGIN;
if (!origin) fail("PREVIEW_ORIGIN is not set.");

const bypass = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
if (!bypass) fail("VERCEL_AUTOMATION_BYPASS_SECRET is not set.");

// Normalise, then prove the key actually parses. Failing here takes a second;
// the alternative is a crypto error several minutes into the E2E run.
const privateKey = normalizePrivateKey(resolved.GOOGLE_PRIVATE_KEY);
try {
  createPrivateKey(privateKey);
} catch (error) {
  const reason = String((error as Error).message).split("\n")[0];
  fail(
    `GOOGLE_PRIVATE_KEY does not parse as a private key (${reason}). ` +
      `The value is ${resolved.GOOGLE_PRIVATE_KEY.length} characters long — ` +
      `check for a truncated or partial paste.`,
  );
}
resolved.GOOGLE_PRIVATE_KEY = privateKey;

// JSON.stringify keeps the multi-line key on a single line with \n escapes,
// which dotenv parses back into exactly the same string.
const lines = ALLOWED.map((name) => `${name}=${JSON.stringify(resolved[name])}`);

lines.push(`PLAYWRIGHT_BASE_URL=${JSON.stringify(origin)}`);
lines.push(`VERCEL_AUTOMATION_BYPASS_SECRET=${JSON.stringify(bypass)}`);

fs.writeFileSync(TARGET, lines.join("\n") + "\n");

console.log(`Wrote ${TARGET} with ${lines.length} keys: ${ALLOWED.join(", ")}`);
