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
import { AccidentInformationPage } from "../../../pages/accident_info";
import { CalendarPage } from "../../../utils/calendar";
import { TimePage } from "../../../utils/time";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK NTA", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("Accident");
  // Verify the selected option text
  const selectedOptionText = await preregPage.getSelectedNoticeTypeText();
  expect(selectedOptionText).toBe("Accident"); // Assert the selected text is correct

  const calendarPage1 = new CalendarPage(page);

  //add accident date
  await page.frameLocator("#baristaPageOut").getByLabel("Accident Date*").click();
  await page.frameLocator("#baristaPageOut").getByRole("combobox").nth(3).selectOption("2021");
  //month will be add 1 month
  await page.frameLocator("#baristaPageOut").getByRole("combobox").nth(2).selectOption("5");
  await page.frameLocator("#baristaPageOut").getByRole("link", { name: "15" }).click();
  // calendarPage1.selectDateAccident("1999", "11", "15");

  const time = new TimePage(page);
  //add accident time
  await page.frameLocator("#baristaPageOut").getByLabel("Accident Time*").click();
  time.selectTimeOption("12", "00", "00");

  await preregPage.selectIdentificationType("2");
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.fillIdentificationNo("881006086603");
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  //expect(filledIdentificationNo).toBe("910227016078");

  await preregPage.fillEmployerCode("A3702087818V");
  const filledEmployerCode = await preregPage.getEmployerCode();
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
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("2021", "7", "1");
  //if done revision will auto pull field
  await insuredPersonInfoPage.fillOccupation("CS");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationality("201749");

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  //add Reference Notice Information

  const accidentInformationPage = new AccidentInformationPage(page1);
  await accidentInformationPage.clickAccidentInformationButton();
  await accidentInformationPage.fillAccidentHappened("test");
  await accidentInformationPage.fillAccidentInjury("test");

  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  await page1.getByRole("textbox").nth(1).click();
  await calendarPage.selectDateInsuredPersonPage("2021", "8", "1");

  await page1.getByRole("textbox").nth(2).click();
  await calendarPage.selectDateMCEndDate("2021", "9", "20");
  await medicalCertificatePage.submitButton().click();

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
  await calendarPage.selectDateInsuredPersonPage("2021", "8", "11");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel("Account No.*", { exact: true }).selectOption("Yes");
  await bankInformationPage.selectAccountNo("Yes");
  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankNameAccident("802121");
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
