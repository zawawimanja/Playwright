import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { EmployerInfoPage } from "../../../pages/employer_info";
import { MedicalCertificatePage } from "../../../pages/mc_info";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { CertificationByEmployerPage } from "../../../pages/cert_employer";
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { AccidentInformationPage } from "../../../pages/accident_info";
import { CalendarPage } from "../../../utils/calendar";
import { TimePage } from "../../../utils/time";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";
import { ButtonPage } from "../../../utils/button";
import { readCSV } from "../../../helper/csvHelper"; // Import the CSV helper
// filepath: /c:/Users/aaror/Downloads/Playwright/e2e/Prereg/S2 - ILAT-BI2PI/test-ILAT-PK.spec.ts
const fs = require("fs");
const path = require("path");

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test.only("Prereg PK NTA HUK EFT MC", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const timePage = new TimePage(page);

  const csvFilePath = path.resolve(__dirname, "../../../testData/testData.csv");
  console.log("Resolved CSV file path:", csvFilePath);

  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();

  await page
    .locator("div")
    .filter({ hasText: /^HUK Pre-Registration$/ })
    .nth(1)
    .click();
  await page.frameLocator("#baristaPageOut").getByLabel("Identification Type").selectOption("205516");
  await page.frameLocator("#baristaPageOut").getByLabel("Identification No.").fill("830330145273");

  await page.frameLocator("#baristaPageOut").getByRole("button", { name: "Search" }).click();

  const page13Promise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").getByRole("button", { name: "Open" }).click();
  const page13 = await page13Promise;

  await page13.getByRole("button", { name: "Case Information", exact: true }).click();
  await page13.getByRole("button", { name: "Application Information" }).click();
  await page13.getByRole("button", { name: "Insured Person Information" }).click();
  await page13.getByRole("button", { name: "FHUS Case Information" }).click();
  await page13.getByRole("button", { name: "Preferred SOCSO Office" }).click();
  await page13.getByRole("button", { name: "Supporting Document" }).click();
  await page13.getByRole("button", { name: "Preview & Submission" }).click();
  await page13.getByRole("button", { name: "Show Preview" }).click();
  await page13.getByRole("button", { name: "Submit" }).click();
  const page14Promise = page13.waitForEvent("popup");
  await page13.getByRole("button", { name: "Yes" }).click();
  const page14 = await page14Promise;
  await page14.getByRole("button", { name: "Close" }).click();
});
