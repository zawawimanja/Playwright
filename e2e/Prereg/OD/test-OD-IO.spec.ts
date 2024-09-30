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

//causeative agent
//recommendation action

test.beforeEach(async ({ page }) => {
  await login(page, "uat_muthu", "u@T_muthu");
});

test("Prereg PK OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();
  expect(leftTabPage.pageBuilderRoot).toContainText(
    "HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler"
  );
  await expect(leftTabPage.myCasesLink).toBeVisible();
  await leftTabPage.myCasesLink.waitFor();
  //leftTabPage.clickMyCases;

  await page.getByRole("link", { name: "My Cases" }).click();

  await page.frameLocator("#baristaPageOut").getByText("My Cases").click();
  await page.frameLocator("#baristaPageOut").getByText("E11NTO20240010014").click();
  await page.frameLocator("#baristaPageOut").getByRole("gridcell", { name: "Occupational Disease Notice" }).click();
  const pagePromise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").getByText("Open Task").click();
  const page2 = await pagePromise;

  await page2.getByRole("button", { name: "Preparer Information" }).click();
  await page2.getByRole("button", { name: "Case Information" }).click();
  await page2.getByRole("button", { name: "Insured Person Information" }).click();
  await page2.getByRole("button", { name: "Employer Information" }).click();
  await page2.getByRole("button", { name: "Certification by Employer" }).click();
  await page2.getByRole("button", { name: "Occupational Disease" }).click();
  await page2.getByRole("button", { name: "Preferred SOCSO Office" }).click();
  await page2.getByRole("button", { name: "Confirmation of Insured" }).click();
  await page2.getByRole("button", { name: "Inconsistent & Doubtful" }).click();
  await page2.getByRole("button", { name: "Appointment" }).click();
  await page2.getByRole("button", { name: "Medical/PPN/ARO Opinion" }).click();
  await page2.getByRole("button", { name: "Recommendation" }).click();
  await page2.getByRole("button", { name: "HUS Information" }).click();
  await page2.getByRole("button", { name: "Bank Information" }).click();
  await page2.getByRole("button", { name: "Supporting Document" }).click();
  await page2.getByRole("button", { name: "Preview & Submission" }).click();

  await preregPage.selectNoticeTypePreRegOption("OD");
  await preregPage.selectInsuredPersonEmployment("Yes");
  await preregPage.selectIdentificationType("2");
  await preregPage.fillIdentificationNo("810311025075");
  await preregPage.selectNoticeAndBenefitClaimFormOption("Insured Person");
  await preregPage.fillEmployerCode("E1100060790X");
  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const page1Promise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await page1Promise;

  const draftPage = new DraftPage(page1);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
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

  await calendarPage.selectDateInsuredPersonPage("2018", "9", "10");
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
  await calendarPage.selectDateInsuredPersonPage("2018", "8", "8");

  await calendarPage.selectDateMCEndDate("2018", "9", "22");
  await medicalCertificatePage.submitButton().click();

  //2nd mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  await page1.locator("#StartDate-adaedf7c-c3f8-477c-852e-c61ecbe51c1c").click();

  await page1.getByRole("textbox").nth(1).click();
  await calendarPage.selectDateInsuredPersonPage("2018", "9", "23");

  await calendarPage.selectDateMCEndDate("2018", "10", "22");
  await medicalCertificatePage.submitButton().click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName("MAT");
  await certificationByEmployerPage.fillDesignation("CEO");
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage("2021", "7", "11");

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

  // await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
