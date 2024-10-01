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

//causeative agent
//recommendation action

test.beforeEach(async ({ page }) => {
  await login(page, "uat_muthu", "u@T_muthu");
  await login(page, "uat_akaw", "u@T_akaw");
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
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  // await page2.getByRole("button", { name: "Preparer Information" }).click();
  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  //await page2.getByRole("button", { name: "Case Information" }).click();
  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

  //await page2.getByRole("button", { name: "Insured Person Information" }).click();
  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //await page2.getByRole("button", { name: "Employer Information" }).click();
  const employerInfoPage = new EmployerInfoPage(page2);
  await employerInfoPage.clickEmployerInfoButton();

  //await page2.getByRole("button", { name: "Certification by Employer" }).click();
  const certificationByEmployerPage = new CertificationByEmployerPage(page2);
  await certificationByEmployerPage.clickCertificationByEmployerButton();

  //await page2.getByRole("button", { name: "Occupational Disease" }).click();
  const occupationalDiseasePage = new OccupationalDiseasePage(page2);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();

  //await page2.getByRole("button", { name: "Preferred SOCSO Office" }).click();
  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  //await page2.getByRole("button", { name: "Confirmation of Insured" }).click();
  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  //await page2.getByRole("button", { name: "Inconsistent & Doubtful" }).click();
  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  //await page2.getByRole("button", { name: "Appointment" }).click();
  const appointmentPage = new AppointmentPage(page2);
  appointmentPage.clickAppointmentButton();

  //await page2.getByRole("button", { name: "Medical/PPN/ARO Opinion" }).click();
  const medicalOpinionPagePage = new MedicalOpinionPage(page2);
  medicalOpinionPagePage.clickedicalOpinionButton();

  //await page2.getByRole("button", { name: "Recommendation" }).click();
  const recommendationPage = new RecommendationPage(page2);
  recommendationPage.clickRecommendationutton();

  //await page2.getByRole("button", { name: "HUS Information" }).click();
  const medicalCertificatePage = new MedicalCertificatePage(page2);
  await medicalCertificatePage.clickHusInfoButton();

  //await page2.getByRole("button", { name: "Bank Information" }).click();
  const bankInformationPage = new BankInformationPage(page2);
  await bankInformationPage.clickBankInformationButton();

  //await page2.getByRole("button", { name: "Supporting Document" }).click();
  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  //await page2.getByRole("button", { name: "Preview & Submission" }).click();
  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  // await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
