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
import { ApprovalPage } from "../../../pages/approval";
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { CalendarPage } from "../../../utils/calendar";
import { SmbInformationPage } from "../../../pages/smb_info";
import { CasesPage } from "../../../pages/cases";

test.beforeEach(async ({ page }) => {
  await login(page, "nazira.pks", "u@T_nazira");
  //await login(page, "atilia.pks", "u@T_atilia");
});
test("Prereg SCO OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const casesPage = new CasesPage(page);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();
  expect(leftTabPage.pageBuilderRoot).toContainText(
    "HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler"
  );
  await expect(leftTabPage.myCasesLink).toBeVisible();
  await leftTabPage.myCasesLink.waitFor();

  await page.getByRole("link", { name: "My Cases" }).click();

  await page.frameLocator("#baristaPageOut").getByText("My Cases").click();

  await expect(page.frameLocator("#baristaPageOut").getByText(`${casesPage.casesCreated}`)).toBeVisible();

  await page
    .frameLocator("#baristaPageOut")
    .getByRole("gridcell", { name: "Occupational Disease Notice" })
    .first()
    .click();

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
  await remarksPage.textboxIO.fill("test io");

  await remarksPage.saveRemarksButton.click();

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

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
  inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  //appointment
  const appointmentPage = new AppointmentPage(page2);
  appointmentPage.clickAppointmentButton();

  //smb info
  const SmbInformationPagePage = new SmbInformationPage(page2);
  SmbInformationPagePage.clickSMBInfoButton();

  const medicalOpinionPage = new MedicalOpinionPage(page2);
  await medicalOpinionPage.medicalOpinionButton.waitFor();
  await expect(medicalOpinionPage.medicalOpinionButton).toBeVisible();
  medicalOpinionPage.clickMedicalOpinionButton();

  //temporary solution not select
  const recommendationPage = new RecommendationPage(page2);
  recommendationPage.clickRecommendationButton();
  await page.waitForTimeout(5000);
  await expect(
    page2.getByText("Reco History Approval History RECOMMENDATIONhide history SAO Approval - Before")
  ).toBeVisible();
  await expect(page2.locator("#ctrlField3158").getByText("Action*")).toBeVisible();
  await expect(page2.locator("#ctrlField3158")).toContainText("Action*");
  await recommendationPage.actionRecommendSCO.waitFor();
  recommendationPage.selectActionOptionSCO();

  //hus info
  const medicalCertificatePage = new MedicalCertificatePage(page2);
  await medicalCertificatePage.clickHusInfoButton();
  //bank info
  const bankInformationPage = new BankInformationPage(page2);
  await bankInformationPage.clickBankInformationButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  // await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
