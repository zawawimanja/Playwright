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

test.beforeEach(async ({ page }) => {
  await login(page, "hilmi.pks", "u@T_hilmi");
  //await login(page, "aslam.pks", "u@T_aslam");
});
test("Prereg MB OD", async ({ page }) => {
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
  // Locate the frame first
  const frame = page.frameLocator("#baristaPageOut");

  // Find the row that contains the specific text
  const row = await frame.locator(`tr:has-text("E11NTO20240010059")`).first();

  // Click on the grid cell within that row

  await page.frameLocator("#baristaPageOut").getByRole("gridcell", { name: "Medical Board Info" }).first().click();

  const pagePromise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").getByText("Open Task").click();
  const page2 = await pagePromise;

  const draftPage = new DraftPage(page2);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  await page2.getByRole("button", { name: "SMB Information" }).click();

  const page3Promise = page2.waitForEvent("popup");
  await page2.getByRole("button", { name: "New" }).click();
  const page3 = await page3Promise;
  await page3.getByRole("button", { name: "Add" }).click();

  //session venue
  await page2.locator("#ctrlField1021").getByRole("textbox").click();
  //session date
  // await page2.getByRole("link", { name: "3", exact: true }).click();
  //disease work
  await page2.locator("#ctrlField1022").getByRole("combobox").selectOption("Yes");
  //mmi
  await page2.locator("#ctrlField1023").getByRole("combobox").selectOption("Yes");
  //desc
  await page2.locator("#ODSF1DescriptionOfDisease-91cc-49827-9bc4-25a3").fill("test");
  //ass type
  await page2.locator("#ctrlField1026").getByRole("combobox").selectOption("Final");
  //session ass
  await page2.locator("#ODSF1SessionAssessment-477a-404ca-acdc-dfc5").fill("20");
  //jd result
  await page2.locator("#ctrlField1033").getByRole("combobox").selectOption("Yes");
  //recommendation
  await page2.locator("#ctrlField1034").getByRole("textbox").fill("test");
  //remark recommendation
  await page2.locator("#ctrlField1049").getByRole("textbox").fill("t");
  //remarks
  await page2.locator("#ctrlField1049").getByRole("textbox").fill("test");
  await page2.getByRole("button", { name: "OK" }).click();

  const calendarPage = new CalendarPage(page2);

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

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  const recommendationPage = new RecommendationPage(page2);
  recommendationPage.clickSAORecommendationButton();

  const medicalOpinionPagePage = new MedicalOpinionPage(page2);
  medicalOpinionPagePage.clickMedicalOpinionButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  // await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
