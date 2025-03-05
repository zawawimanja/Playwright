import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { CalendarPage } from "../../../utils/calendar";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";
import { ButtonPage } from "../../../utils/button";
import { CertificationByEmployerPage } from "../../../pages/cert_employer";

import { readCSV } from "../../../helper/csvHelper"; // Import the CSV helper
// filepath: /c:/Users/aaror/Downloads/Playwright/e2e/Prereg/S2 - ILAT-BI2PI/test-ILAT-PK.spec.ts
const fs = require("fs");
const path = require("path");

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK FOT", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  // Read data from CSV
  const csvFilePath = path.resolve(__dirname, "../../../testData/testData.csv"); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data

  await page.waitForLoadState("networkidle");
  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await page.waitForLoadState("networkidle");

  await preregPage.noticeTypePreRegSelect.waitFor({ state: "visible" });
  await preregPage.selectNoticeTypePreRegOption("Death - FOT");
  const noticeTypeText = await preregPage.getnoticeTypePreRegSelect();
  expect(noticeTypeText).toBe("Death - FOT");

  // Fill in identification type and number
  await preregPage.selectIdentificationType(data.identificationType);
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe(data.identificationType);

  await preregPage.fillIdentificationNo(data.identificationNo);
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data.identificationNo);

  await preregPage.selectNoticeAndBenefitClaimFormOption(data.noticeAndBenefitClaimForm);
  const NoticeAndBenefitClaimFormOptionText = await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe(data.noticeAndBenefitClaimForm);

  await preregPage.fillEmployerCode(data.employerCode);

  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;

  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  await page1.waitForLoadState("networkidle");

  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test PK");
  await remarksPage.saveRemarksButton.click();

  await page1.waitForLoadState("networkidle");

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  await insuredPersonInfoPage.insuredPersonInfoButton.waitFor({ state: "visible" });
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  const calendarPage = new CalendarPage(page1);
  await calendarPage.selectDateInsuredPersonPage(data.accidentYear, data.accidentMonth, data.accidentDay);
  //if done revision will auto pull field
  await insuredPersonInfoPage.fillOccupationPKT("CS");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationality("201749");

  //add death info
  await page1.getByRole("button", { name: "Death Info" }).click();

  await page1.getByLabel("Date of Death*").click();

  await page1.getByRole("combobox").nth(4).selectOption("2021");
  //add 1 more month like accident
  await page1.getByRole("combobox").nth(3).selectOption("5");
  await page1.getByRole("link", { name: "9", exact: true }).click();

  await page1.getByLabel("Cause of Death*").click();
  await page1.getByLabel("Cause of Death*").fill("test");

  await page1.getByLabel("Marital Status of Insured").selectOption("90501");
  await page1.getByLabel("Accident Date*").click();
  await page1.getByRole("combobox").nth(4).selectOption("2021");
  //add 1 more month like accident
  await page1.getByRole("combobox").nth(3).selectOption("1");
  await page1.getByRole("link", { name: "8", exact: true }).click();

  //add dependent info
  await page1.getByRole("button", { name: "Dependent Info" }).click();
  await page1.getByLabel("Dependent Information").selectOption("Yes");
  const page2Promise = page1.waitForEvent("popup");
  await page1.getByRole("button", { name: "Add Dependent" }).click();
  const page2 = await page2Promise;

  await page2.getByLabel("Relationship with Insured").selectOption("90404");
  await page2.getByLabel("Gender*").selectOption("200602");
  await page2.getByLabel("Dependent Name*").fill("umi");

  await page2.getByRole("textbox", { name: "Identification No.*" }).fill("680821045674");

  await page2.getByRole("textbox", { name: "Address*" }).fill("taman");

  await page2.locator("#AddressLine2").fill("lorong");

  await page2.locator("#AddressLine3").fill("jalan");

  await page2.getByLabel("State*").selectOption("200714");
  await page2.getByLabel("City*").selectOption("201460");
  await page2.getByLabel("Postcode*").fill("51000");
  await page2.getByLabel("Does Dependent has Guardian?*").selectOption("0");

  const bankInformationPage = new BankInformationPage(page2);

  await bankInformationPage.selectAccountNoPKT("1");

  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankNamePKT("21");
  await bankInformationPage.selectBankAccountType("204401");
  await bankInformationPage.fillBankBranch("KL");
  await bankInformationPage.fillBankAccountNo("12345678");

  const button = new ButtonPage(page2);
  await button.clickSave();

  await page1.getByRole("button", { name: "Save" }).click();
  await page1.locator("button").filter({ hasText: "Save" }).click();
  await page1.getByRole("button", { name: "Close" }).click();

  await page1.reload();

  await page1.getByText("Death Notice App").click();
  await page1.waitForLoadState("networkidle");
  // after refresh wages info not function ,need to manual click
  //add fmp info
  await page1.waitForTimeout(15000);
  await page1.getByRole("button", { name: "FPM Info" }).waitFor();
  await page1.getByRole("button", { name: "FPM Info" }).isVisible;

  await page1.getByRole("button", { name: "FPM Info" }).click();
  await expect(page1.getByRole("button", { name: "Pull Dependent" })).toBeVisible();
  await page1.getByRole("button", { name: "Pull Dependent" }).click();
  await page1.waitForTimeout(10000);
  await page1.getByRole("button", { name: "Yes" }).click();
  await page1.waitForTimeout(10000);

  await page1.getByRole("button", { name: "Pull Dependent" }).click();
  await page1.getByRole("button", { name: "Yes" }).click();
  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();
  await page1.getByLabel("Is Wages Paid on the Day of").selectOption("No");

  //await page2.getByRole('button', { name: 'Preferred SOCSO Office' }).click();
  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  //add certificate by employer
  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName("MAT");
  await certificationByEmployerPage.fillDesignation("CEO");
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage("2021", "8", "11");

  await page1.getByRole("button", { name: "Confirmation of Dependent/" }).click();

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();
  await previewSubmissionPage.clickSubmitButton();

  const buttonPage = new ButtonPage(page1);
  buttonPage.clickYes();

  // const page3Promise = page1.waitForEvent("popup");
  // const page3 = await page3Promise;

  // Wait for the element to be present
  await page.waitForLoadState("networkidle");
  await page.getByLabel("Scheme Ref No.").isVisible();
  await page.getByLabel("Scheme Ref No.").waitFor();

  const schemeRefValue = await page.getByLabel("Scheme Ref No.").inputValue();
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
  await page.getByRole("button", { name: "Proceed" }).click();
});
