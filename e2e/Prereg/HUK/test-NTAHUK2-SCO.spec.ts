import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { EmployerInfoPage } from '../../../pages/employer_info';
import { MedicalCertificatePage } from '../../../pages/mc_info';
import { WagesInfoPage } from '../../../pages/wages_info';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { CertificationByEmployerPage } from '../../../pages/cert_employer';
import { BankInformationPage } from '../../../pages/bank_info';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { RecommendationPage } from '../../../pages/recommendation';
import { MedicalOpinionPage } from '../../../pages/medical_opinion';
import { PreparerInformationPage } from '../../../pages/preparer_info';
import { CaseInformationPage } from '../../../pages/case_info';
import { AppointmentPage } from '../../../pages/appointment';
import { InconsistentDoubtfulPage } from '../../../pages/inconsistentdoubtful';
import { AccidentInformationPage } from '../../../pages/accident_info';
import { CasesPage } from '../../../pages/cases';
import { SubmitPage } from '../../../pages/submit';
import { MyCasesPage } from '../../../pages/mycases';
import { HeaderPage } from '../../../pages/header';
import { ButtonPage } from '../../../utils/button';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  //await login(page, "atilia.pks", "u@T_atilia");
  await login(page, 'nazira.pks', 'u@T_nazira');
});

export let schemeRefValue: string;
test('Prereg SCO NTA', async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);

  let loginUser = 'atilia.pks';
  let caseFound = false;

  while (!caseFound) {
    await leftTabPage.leftBar.waitFor();
    await expect(leftTabPage.leftBar).toBeVisible();

    await expect(leftTabPage.myCasesLink).toBeVisible();
    await leftTabPage.myCasesLink.waitFor();

    // Click my cases left tab
    await leftTabPage.clickMyCases();

    await casesPage.init('HUK');

    // Check if the case exists for the current login user
    if (await myCasesPage.clickAccident('HUK SCO')) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      // Re-login with the new user
      await page.reload(); // Reload the page to start fresh

      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      // await login(page, "nazira.pks", "u@T_nazira");
      await login(page, 'atilia.pks', 'u@T_atilia');
    }
  }

  const pagePromise = page.waitForEvent('popup');
  await page
    .frameLocator('#baristaPageOut')
    .frameLocator('#APWorkCenter')
    .getByText('Open Task')
    .click();
  const page2 = await pagePromise;

  const draftPage = new DraftPage(page2);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText('Remarks');
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.inputRemarks('sco');
  await remarksPage.saveRemarksButton.click();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationHUKButton();

  //add Application Information

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //add FHUS Case Information

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  //appointment
  const appointmentPage = new AppointmentPage(page2);
  await appointmentPage.clickAppointmentButton();

  //add Investigation Document

  //add Medical Board Decision

  const medicalOpinionPage = new MedicalOpinionPage(page2);
  await medicalOpinionPage.medicalOpinionButton.waitFor();
  await expect(medicalOpinionPage.medicalOpinionButton).toBeVisible();
  await medicalOpinionPage.clickMedicalOpinionButton();

  //temporary solution
  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickRecommendationButton();
  await recommendationPage.selectActionRecommendNTAILAT(
    'Refer to Medical Board',
  );

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage = new ButtonPage(page2);
  buttonPage.clickYes();

  const page3Promise = page2.waitForEvent('popup');
  const page3 = await page3Promise;

  // Wait for the element to be present
  await page3.getByLabel('Scheme Ref No:').waitFor();

  // Perform other actions as needed
  await page3.getByRole('button', { name: 'Close' }).click();
});
