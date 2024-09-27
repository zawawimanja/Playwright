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
import { NewRegistrationPage } from "../../../pages/new_registration";
import { PaymentOptionPage } from "../../../pages/payment_option";
import { CalendarPage } from "../../../utils/calendar";

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

test("Prereg PK HUK Payment Option", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();
  expect(leftTabPage.pageBuilderRoot).toContainText(
    "HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler"
  );
  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickCreateRevision();

  await preregPage.selectRevisionType("HUK_PAYOPT");

  await preregPage.setSearchByOption("SchemeRefNo");
  await preregPage.enterSchemeRefNo("E11NTO20240010005");
  await preregPage.clickSearchButton();
  await preregPage.clickCreateRevisionButton();

  const pagePromise = page.waitForEvent("popup");

  const page1 = await pagePromise;

  const newRegistrationPage = new NewRegistrationPage(page1);

  newRegistrationPage.clickNewRegistrationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);

  await insuredPersonInfoPage.clickInsuredPersonInfoButtonRPO();

  const paymentoptionPage = new PaymentOptionPage(page1);

  await paymentoptionPage.clickPaymentOptionButton();
  paymentoptionPage.selectPaymentOption("92003");

  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  //   await previewSubmissionPage.clickShowPreviewButton();

  // await previewSubmissionPage.clickSubmitButton();
  // await previewSubmissionPage.clickYesButton();
  // await previewSubmissionPage.navigateToEFormRenderPage();
});
