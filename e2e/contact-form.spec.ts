import { test, expect, Page } from "@playwright/test";
import { google } from "googleapis";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function fillBaseFields(
  page: Page,
  data: { name: string; email: string; phone?: string; company: string; message?: string }
) {
  await page.fill('[name="name"]', data.name);
  await page.fill('[name="email"]', data.email);
  if (data.phone) await page.fill('[name="phone"]', data.phone);
  await page.fill('[name="company"]', data.company);
  if (data.message) await page.fill('[name="message"]', data.message);
}

async function pickSelect(page: Page, fieldName: string, optionLabel: string) {
  const hiddenSelect = page.locator(`[name="${fieldName}"]`);
  const triggerXpath = hiddenSelect.locator("xpath=following-sibling::button[1]");

  if (await triggerXpath.count() > 0) {
    await triggerXpath.first().click();
  } else {
    await hiddenSelect.locator("..").locator("button").first().click();
  }

  await page.getByRole("option", { name: optionLabel, exact: true }).click();
}

/** 
 * Read the Google Sheet and find the row matching a specific email.
 */
async function getSheetRowByEmail(email: string): Promise<string[] | undefined> {
  const auth = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET
  );
  auth.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.TEST_SPREADSHEET_ID ?? "",
    range: "Sheet1!A:Z", // widened range just in case
  });

  const rows = res.data.values ?? [];
  return rows.find(r => r.includes(email));
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

const CONTACT_PAGE = process.env.CONTACT_PAGE_PATH ?? "/contact";

// Run sheet-modifying tests serially to avoid Google Sheets API append race conditions (shifting columns)
test.describe.serial("ContactForm — happy paths", () => {
  test("Founder role: submits successfully and updates Google Sheet", async ({ page }) => {
    const uniqueEmail = `e2e-founder-${Date.now()}@example.com`;
    await page.goto(CONTACT_PAGE);

    await fillBaseFields(page, {
      name: "E2E Founder Test",
      email: uniqueEmail,
      phone: "+919876543210",
      company: "E2E Startup",
      message: "Automated E2E test — founder role",
    });

    await pickSelect(page, "role", "Founder/Entrepreneur");
    await pickSelect(page, "fundingStage", "Seed");
    await pickSelect(page, "teamSize", "1-5 members");
    await pickSelect(page, "sector", "SaaS");

    // Wait for Turnstile token
    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Your message has been sent successfully!")
    ).toBeVisible({ timeout: 20_000 });

    const row = await getSheetRowByEmail(uniqueEmail);
    expect(row).toBeDefined();
    expect(row).toContain("E2E Founder Test");
    expect(row).toContain("founder");
    expect(row).toContain("seed");
    expect(row).toContain("1-5");
    expect(row).toContain("saas");
  });

  test("Investor role: submits successfully and updates Google Sheet", async ({ page }) => {
    const uniqueEmail = `e2e-investor-${Date.now()}@example.com`;
    await page.goto(CONTACT_PAGE);

    await fillBaseFields(page, {
      name: "E2E Investor Test",
      email: uniqueEmail,
      company: "E2E Fund",
    });

    await pickSelect(page, "role", "Investor/VC");
    await pickSelect(page, "investmentRange", "₹1-5 Lakhs");
    await pickSelect(page, "investmentStage", "Pre-Seed");
    await page.fill('[name="sectorsOfInterest"]', "FinTech, SaaS");

    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Your message has been sent successfully!")
    ).toBeVisible({ timeout: 20_000 });

    const row = await getSheetRowByEmail(uniqueEmail);
    expect(row).toBeDefined();
    expect(row).toContain("E2E Investor Test");
    expect(row).toContain("investor");
    expect(row).toContain("1l-5l");
  });

  test("Enabler role: submits successfully and updates Google Sheet", async ({ page }) => {
    const uniqueEmail = `e2e-enabler-${Date.now()}@example.com`;
    await page.goto(CONTACT_PAGE);

    await fillBaseFields(page, {
      name: "E2E Enabler Test",
      email: uniqueEmail,
      company: "E2E Accelerator",
    });

    await pickSelect(page, "role", "Enabler/Accelerator");
    await pickSelect(page, "organizationType", "Accelerator");
    await pickSelect(page, "programType", "Acceleration Program");
    await page.fill('[name="supportServices"]', "Marketing, Branding");

    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Your message has been sent successfully!")
    ).toBeVisible({ timeout: 20_000 });

    const row = await getSheetRowByEmail(uniqueEmail);
    expect(row).toBeDefined();
    expect(row).toContain("E2E Enabler Test");
    expect(row).toContain("enabler");
    expect(row).toContain("accelerator");
  });
});

test.describe("ContactForm — validation", () => {
  test("shows generic error and role error when required fields are empty", async ({ page }) => {
    await page.goto(CONTACT_PAGE);
    // Disable HTML5 native form validation to test server-side Zod errors
    await page.locator('form').evaluate((f: HTMLFormElement) => f.noValidate = true);

    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Please fix the errors in the form.")
    ).toBeVisible({ timeout: 10_000 });
  });

  test("shows inline errors for specific fields when role is selected", async ({ page }) => {
    await page.goto(CONTACT_PAGE);
    await page.locator('form').evaluate((f: HTMLFormElement) => f.noValidate = true);

    await pickSelect(page, "role", "Founder/Entrepreneur");

    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Name is required")
    ).toBeVisible({ timeout: 10_000 });
  });

  test("shows error for invalid email format", async ({ page }) => {
    await page.goto(CONTACT_PAGE);
    await page.locator('form').evaluate((f: HTMLFormElement) => f.noValidate = true);

    await page.fill('[name="name"]', "Test User");
    await page.fill('[name="email"]', "not-an-email");
    await pickSelect(page, "role", "Founder/Entrepreneur");

    await expect(page.locator('input[name="cf-turnstile-response"]')).toHaveValue(/.+/, { timeout: 15_000 });
    await page.click('button[type="submit"]');

    await expect(
      page.locator("text=Invalid email address")
    ).toBeVisible({ timeout: 10_000 });
  });
});
