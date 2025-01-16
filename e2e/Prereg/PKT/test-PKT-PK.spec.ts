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

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK PKT", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("Death - PKT");
  // Verify the selected option text
  const selectedOptionText = await preregPage.getSelectedNoticeTypeText();
  expect(selectedOptionText).toBe("Death - PKT"); // Assert the selected text is correct

  const calendarPage1 = new CalendarPage(page);

  await preregPage.selectIdentificationType("2");
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.selectNoticeAndBenefitClaimFormOption("Others");
  const NoticeAndBenefitClaimFormOptionText = await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe("Others");

  await preregPage.fillIdentificationNo("820325085473");
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  //expect(filledIdentificationNo).toBe("910227016078");

  // await preregPage.fillEmployerCode("E1100000366Y");
  // const filledEmployerCode = await preregPage.getEmployerCode();
  //expect(filledEmployerCode).toBe("A3700059551B");

  await page.frameLocator("#baristaPageOut").locator("#row23column2").click();
  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;
  await page1.waitForTimeout(30000);
  const draftPage = new DraftPage(page1);

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
  await remarksPage.textbox.fill("test PK");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("1997", "9", "20");
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
  await page1.getByRole("combobox").nth(3).selectOption("2021");
  //add 1 more month like accident
  await page1.getByRole("combobox").nth(2).selectOption("2");
  await page1.getByRole("link", { name: "17" }).click();
  await page1.getByLabel("Cause of Death*").fill("tst");
  await page1.getByLabel("Marital Status of Insured").selectOption("90501");

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

  await page1.locator("button").filter({ hasText: "Save" }).click();
  await page1.getByRole("button", { name: "Close" }).click();

  await page1.reload();
  await page1.getByText("Death Notice App").click();

  //add fmp info
  await page1.getByRole("button", { name: "FPM Info" }).click();

  await page1.getByRole("button", { name: "Pull Dependent" }).click();
  await page1.getByRole("button", { name: "Yes" }).click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  //await page2.getByRole('button', { name: 'Preferred SOCSO Office' }).click();
  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  const button1 = new ButtonPage(page1);
  await button1.clickSave();

  await page1.getByRole("button", { name: "Confirmation of Dependent/" }).click();

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();
  await page1.reload();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  await previewSubmissionPage.clickYesButton();

  submitPage = new SubmitPage(page1);

  await expect(submitPage.schemeRefNo).toBeVisible();

  // schemeRefValue = await submitPage.schemeRefNo.inputValue();
  // console.log(" SRN " + schemeRefValue);

  // await expect(submitPage.caseStatusPendingInvestigation_PK_SAO).toBeVisible();

  // await submitPage.submitButton.click();
});
