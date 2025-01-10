import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { OccupationalDiseasePage } from "../../../pages/od_info";
import { EmployerInfoPage } from "../../../pages/employer_info";
import { MedicalCertificatePage } from "../../../pages/mc_info";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { CertificationByEmployerPage } from "../../../pages/cert_employer";
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { CalendarPage } from "../../../utils/calendar";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("OD");
  // Verify the selected option text
  const selectedOptionText = await preregPage.getSelectedNoticeTypeText();
  expect(selectedOptionText).toBe("OD"); // Assert the selected text is correct

  await preregPage.selectInsuredPersonEmployment("Yes");
  const selectedEmploymentText = await preregPage.getSelectedInsuredPersonEmploymentText();
  expect(selectedEmploymentText).toBe("Yes");

  await preregPage.selectIdentificationType("2");
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.selectNoticeAndBenefitClaimFormOption("Insured Person");
  const NoticeAndBenefitClaimFormOptionText = await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe("Insured Person");

  await preregPage.fillIdentificationNo("690805035640");
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  //expect(filledIdentificationNo).toBe("910227016078");

  await preregPage.fillEmployerCode("F9200000909W");
  const filledEmployerCode = await preregPage.getEmployerCode();
  //expect(filledEmployerCode).toBe("A3700059551B");

  await preregPage.clickClaimFormSubmissionByListButton();
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
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("1991", "5", "10");
  await insuredPersonInfoPage.fillOccupation("CS");
  await insuredPersonInfoPage.selectOccupation("1000002");
  await insuredPersonInfoPage.selectSubOccupation("1001132");
  await insuredPersonInfoPage.selectSubOccupationalList("1002058");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationality("201749");

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page1);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();
  await occupationalDiseasePage.fillDescriptionOfOccupational("test");

  await occupationalDiseasePage.selectDiseaseRelatedEMploymentOption("Yes");

  await occupationalDiseasePage.fillSpecifyDutiesAndHow("test");
  await occupationalDiseasePage.fillPleaseExplainSymptoms("test");
  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  await page1.getByRole("textbox").nth(1).click();
  await calendarPage.selectDateInsuredPersonPage("1991", "1", "10");

  await page1.getByRole("textbox").nth(2).click();
  await calendarPage.selectDateMCEndDate("1991", "2", "20");
  await medicalCertificatePage.submitButton().click();

  //2nd mc
  // await medicalCertificatePage.addRecord();
  // await medicalCertificatePage.enterClinicHospitalName("kl");

  // await calendarPage.startDateInput.click();

  // await calendarPage.selectDateInsuredPersonPage("2021", "7", "9");

  // await calendarPage.endDateInput.click();

  // await calendarPage.selectDateMCEndDate("2021", "7", "14");
  // await medicalCertificatePage.submitButton().click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName("MAT");
  await certificationByEmployerPage.fillDesignation("CEO");
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage("1991", "8", "11");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel("Account No.*", { exact: true }).selectOption("Yes");
  await bankInformationPage.selectAccountNo("Yes");
  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankName("802121");
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
  await previewSubmissionPage.clickYesButton();

  submitPage = new SubmitPage(page1);

  await expect(submitPage.schemeRefNo).toBeVisible();

  // schemeRefValue = await submitPage.schemeRefNo.inputValue();
  // console.log(" SRN " + schemeRefValue);

  await expect(submitPage.caseStatusPendingInvestigation_PK_SAO).toBeVisible();

  await submitPage.submitButton.click();
});
