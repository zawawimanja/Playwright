import { test, expect } from "@playwright/test";
import { login } from "../../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../../pages/prereg";
import { LeftTabPage } from "../../../../pages/left_tab";
import { DraftPage } from "../../../../pages/draft";
import { RemarksPage } from "../../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../../pages/preview_submission";
import { OccupationalDiseasePage } from "../../../../pages/od_info";
import { EmployerInfoPage } from "../../../../pages/employer_info";
import { MedicalCertificatePage } from "../../../../pages/mc_info";
import { WagesInfoPage } from "../../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../../pages/socso_office";
import { CertificationByEmployerPage } from "../../../../pages/cert_employer";
import { BankInformationPage } from "../../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../../pages/confirm_person";
import { CalendarPage } from "../../../../utils/calendar";
import { SubmitPage } from "../../../../pages/submit";
import { CasesPage } from "../../../../pages/cases";

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Revision PK OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.createRevisionLink).toBeVisible();

  await leftTabPage.clickCreateRevision();

  await page.frameLocator("#baristaPageOut").locator("#RevisionType").selectOption("HUK_PAYOPT");

  await page.frameLocator("#baristaPageOut").getByLabel("Scheme Reference Number").fill("E11NTO20240010178");

  await page.frameLocator("#baristaPageOut").getByRole("button", { name: "Search" }).click();

  const page1Promise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").getByRole("button", { name: "Create Revision" }).click();
  const page1 = await page1Promise;

  await page1.getByRole("button", { name: "New Registration" }).click();

  await page1.getByRole("button", { name: "Insured Person Info" }).click();
  await page1.getByRole("button", { name: "Payment Option" }).click();

  await page1.getByLabel("Payment Option*").selectOption("92002");
  await page1.getByRole("button", { name: "Supporting Document" }).click();
  await page1.getByRole("button", { name: "Preview & Submission" }).click();
});
