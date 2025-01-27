import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { CalendarPage } from "../../../utils/calendar";
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

test("Prereg PK RPO", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  // Read data from CSV
  const csvFilePath = path.resolve(__dirname, "../../../testData/testData.csv"); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  leftTabPage.clickCreateRevision();

  await preregPage.selectRevisionType("HUK Payment Option");

  await preregPage.setSearchByOption("IC");

  await preregPage.enterIdentificationNo("980910025925");

  await preregPage.clickSearchButton();
  await preregPage.clickCreateRevisionButton();

  const pagePromise = page.waitForEvent("popup");

  const page1 = await pagePromise;

  const draftPage = new DraftPage(page);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
  remarksPage.clickRemarksButton();
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  //add Revision Information
  await page1.getByRole("button", { name: "New Registration" }).waitFor();
  await page1.getByRole("button", { name: "New Registration" }).isVisible;
  await page1.getByRole("button", { name: "New Registration" }).click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  await insuredPersonInfoPage.insuredPersonInfoButtonRPO.waitFor();
  await insuredPersonInfoPage.insuredPersonInfoButtonRPO.isVisible();
  await insuredPersonInfoPage.clickInsuredPersonInfoButtonRPO;

  //payment option
  await page1.getByRole("button", { name: "Payment Option" }).click();
  //periodical
  await page1.getByLabel("Payment Option*").selectOption("92003");

  //calendar.selectDateInsuredPersonPage("2024", "7", "7");

  await page1.getByLabel("Payment Option Received Date*").click();
  await page1.getByRole("combobox").nth(2).selectOption("2024");
  await page1.getByRole("combobox").nth(1).selectOption("8");
  await page1.getByRole("cell", { name: "18" }).click();

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();
  await previewSubmissionPage.clickSubmitButton();

  const buttonPage = new ButtonPage(page1);
  buttonPage.clickYes();

  const page2Promise = page1.waitForEvent("popup");
  const page2 = await page2Promise;

  // Wait for the element to be present
  await page2.getByLabel("Scheme Ref No:").waitFor();

  const schemeRefValue = await page2.getByLabel("Scheme Ref No:").inputValue();
  console.log("SRN from locator: " + schemeRefValue);
  const filePath = path.resolve(__dirname, "schemeRefValue.json");
  fs.writeFileSync(filePath, JSON.stringify({ schemeRefValue }));

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log("File schemeRefValue.json exists at path: " + filePath);
  } else {
    console.log("File schemeRefValue.json does not exist at path: " + filePath);
  }

  // Perform other actions as needed
  await page2.getByRole("button", { name: "Close" }).click();
});
