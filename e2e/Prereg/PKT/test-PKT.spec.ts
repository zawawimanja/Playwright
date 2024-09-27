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
import { TIMEOUT } from "dns";

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

test("Prereg PK PKT", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();
  expect(leftTabPage.pageBuilderRoot).toContainText(
    "HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler"
  );
  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("Death - PKT");
  await preregPage.selectNoticeAndBenefitClaimFormOption("Employer");
  await preregPage.fillIdentificationNo("961130086256");
  await preregPage.fillEmployerCode("B3200086169Z");
  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const page1Promise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await page1Promise;

  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  await insuredPersonInfoPage.insuredPersonInfoButton.waitFor();
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();
  await insuredPersonInfoPage.selectDate("2020");

  //Death Info
  //Dependent Info
  //FPM Info

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.submitButton.waitFor({ timeout: 120000 });

  await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
