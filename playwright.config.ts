import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";

// Load .env.test when present.
// Locally: create it from .env.test.example.
// In CI:   it is generated from Vercel's Preview environment scope.
dotenv.config({
  path: path.resolve(process.cwd(), ".env.test"),
  override: true,
});

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";

// When PLAYWRIGHT_BASE_URL is set we are testing a deployed environment
// (preview/production), so there is no local dev server to boot.
const isRemoteTarget = Boolean(process.env.PLAYWRIGHT_BASE_URL);

// Vercel Deployment Protection blocks unauthenticated requests to preview
// deployments with a 401. The automation bypass secret lets Playwright through.
const bypassSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI
    ? [["github"], ["html", { open: "never" }]]
    : "list",
  use: {
    baseURL: BASE_URL,
    trace: "on-first-retry",
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
    extraHTTPHeaders: bypassSecret
      ? {
          "x-vercel-protection-bypass": bypassSecret,
          "x-vercel-set-bypass-cookie": "true",
        }
      : {},
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],

  /* Start bun dev only when running against localhost */
  webServer: isRemoteTarget
    ? undefined
    : {
        command: "bun run dev",
        url: `${BASE_URL}/contact`,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: "pipe",
        stderr: "pipe",
      },
});
