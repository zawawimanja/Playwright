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
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { CalendarPage } from "../../../utils/calendar";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";
import { InvalidityInfoPage } from "../../../pages/invalidity_info";
import { ButtonPage } from "../../../utils/button";

const fs = require("fs");
const path = require("path");

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK ILAT", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("ILAT");
  // Verify the selected option text
  const selectedOptionText = await preregPage.getSelectedNoticeTypeText();
  expect(selectedOptionText).toBe("ILAT"); // Assert the selected text is correct

  await preregPage.selectIdentificationType("2");
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.fillIdentificationNo("860730355170");
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  // expect(filledIdentificationNo).toBe("960618145171");

  await preregPage.selectNoticeAndBenefitClaimFormOption("Insured Person");
  const NoticeAndBenefitClaimFormOptionText = await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe("Insured Person");

  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;
  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
  remarksPage.clickRemarksButton();
  // await remarksPage.remarksButton.waitFor();
  // await expect(remarksPage.remarksButton).toBeVisible();
  // await expect(remarksPage.sectionTabs).toContainText("Remarks");
  // await remarksPage.remarksButton.waitFor();
  // await remarksPage.addRemarksButton.click();
  // await remarksPage.textbox.fill("test");
  // await remarksPage.saveRemarksButton.click();

  //error message
  //if exist check close button and if not continue

  // Check if the "Close" button exists and is visible
  const closeButton = page1.getByRole("button", { name: "Close" });
  await page1.getByLabel("Message").waitFor();
  if (await page1.getByLabel("Message").isVisible()) {
    await closeButton.waitFor();
    await closeButton.click(); // Click the button if it exists
  }

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("2017", "6", "1");
  await insuredPersonInfoPage.fillOccupationILAT("CS");

  await insuredPersonInfoPage.fillAddress1("Taman Abadi");

  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationalityILAT();

  const invalidtyInformation = new InvalidityInfoPage(page1);

  await invalidtyInformation.clickInvalidityInformation();
  await invalidtyInformation.selectInsuredPersonEmployment("No");
  await page1.getByLabel("Date of Cessation of").click();
  await calendarPage.selectDateInsuredPersonPage("2017", "5", "31");

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel("Account No.*", { exact: true }).selectOption("Yes");
  await bankInformationPage.selectAccountNo("Yes");
  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankNameILAT("802121");
  await bankInformationPage.selectBankAccountType("204401");
  await bankInformationPage.fillBankBranch("KL");
  await bankInformationPage.fillBankAccountNo("12345678");

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page1);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();
  await confirmationOfInsuredPage.checkCompletedCheckbox();

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
