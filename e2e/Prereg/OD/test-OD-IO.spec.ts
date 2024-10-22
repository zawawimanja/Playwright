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
import { RecommendationPage } from "../../../pages/recommendation";
import { MedicalOpinionPage } from "../../../pages/medical_opinion";
import { PreparerInformationPage } from "../../../pages/preparer_info";
import { CaseInformationPage } from "../../../pages/case_info";
import { AppointmentPage } from "../../../pages/appointment";
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { CalendarPage } from "../../../utils/calendar";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";

test.beforeEach(async ({ page }) => {
  // await login(page, "uat_muthu", "u@T_muthu");
  await login(page, "uat_akaw", "u@T_akaw");
});

export let schemeRefValue: string;

test("Prereg IO OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init();

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.myCasesLink).toBeVisible();
  await leftTabPage.myCasesLink.waitFor();

  //click my cases left tab
  await leftTabPage.clickMyCases();

  //click  my cases tab
  await myCasesPage.clickMyCases();

  await page.waitForTimeout(5000);

  await myCasesPage.clickOD();

  const pagePromise = page.waitForEvent("popup");
  await casesPage.frameLocator.getByText("Open Task").click();
  const page2 = await pagePromise;

  const draftPage = new DraftPage(page2);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textboxIO.fill("test io");

  await remarksPage.saveRemarksButton.click();

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  const caseInformationPage = new CaseInformationPage(page2);
  await caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  const employerInfoPage = new EmployerInfoPage(page2);
  await employerInfoPage.clickEmployerInfoButton();

  const certificationByEmployerPage = new CertificationByEmployerPage(page2);
  await certificationByEmployerPage.clickCertificationByEmployerButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page2);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();
  occupationalDiseasePage.selectCausativeAgentOption();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  const appointmentPage = new AppointmentPage(page2);
  await appointmentPage.clickAppointmentButton();

  const medicalOpinionPage = new MedicalOpinionPage(page2);
  await medicalOpinionPage.medicalOpinionButton.waitFor();
  await expect(medicalOpinionPage.medicalOpinionButton).toBeVisible();
  medicalOpinionPage.clickMedicalOpinionButton();

  await page.waitForTimeout(10000);
  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.recommendationButton.waitFor();
  await expect(recommendationPage.recommendationButton).toBeVisible();
  recommendationPage.clickRecommendationButton();

  await page2.getByRole("heading", { name: "RECOMMENDATION", exact: true }).click();
  await expect(page2.getByRole("heading", { name: "RECOMMENDATION", exact: true })).toBeVisible();
  await expect(page2.locator("#Heading37")).toContainText("RECOMMENDATION");
  await expect(page2.getByRole("heading", { name: "Recommendation", exact: true })).toBeVisible();
  await expect(page2.locator("#Recommendation")).toContainText("Recommendation");
  await page2.locator("#ctrlField407").getByText("Action*").click();
  await expect(page2.locator("#ctrlField407")).toContainText("Action*");
  await expect(page2.locator("#ctrlField407").getByText("Action*")).toBeVisible();
  await expect(recommendationPage.actionRecommend).toBeVisible();
  await recommendationPage.actionRecommend.waitFor();

  recommendationPage.selectActionOption();

  const medicalCertificatePage = new MedicalCertificatePage(page2);
  await medicalCertificatePage.clickHusInfoButton();

  const bankInformationPage = new BankInformationPage(page2);
  await bankInformationPage.clickBankInformationButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();

  await previewSubmissionPage.clickYesButton();

  await page2.waitForTimeout(15000);

  submitPage = new SubmitPage(page2);

  await expect(submitPage.schemeRefNo).toBeVisible();

  await expect(submitPage.caseStatusPendingApproval_IO_SCO).toBeVisible();

  await submitPage.submitButton.click();
});
