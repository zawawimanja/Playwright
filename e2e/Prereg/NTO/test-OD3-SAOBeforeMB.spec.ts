import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { OccupationalDiseasePage } from '../../../pages/od_info';
import { EmployerInfoPage } from '../../../pages/employer_info';
import { MedicalCertificatePage } from '../../../pages/mc_info';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { CertificationByEmployerPage } from '../../../pages/cert_employer';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { RecommendationPage } from '../../../pages/recommendation';
import { MedicalOpinionPage } from '../../../pages/medical_opinion';
import { PreparerInformationPage } from '../../../pages/preparer_info';
import { CaseInformationPage } from '../../../pages/case_info';
import { ApprovalPage } from '../../../pages/approval';
import { InconsistentDoubtfulPage } from '../../../pages/inconsistentdoubtful';
import { CasesPage } from '../../../pages/cases';
import { SubmitPage } from '../../../pages/submit';
import { MyCasesPage } from '../../../pages/mycases';
import { HeaderPage } from '../../../pages/header';
import { ButtonPage } from '../../../utils/button';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  //await login(page, 'roliana.pks', 'u@T_roliana');
   await login(page, "uat_sukri", "u@T_sukri");
});

export let schemeRefValue: string;
test('Prereg SAO OD', async ({ page }) => {
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init('NTO');

  //let loginUser = "uat_ali";
  let loginUser = 'roliana.pks';
  let caseFound = false;

  while (!caseFound) {
    // await leftTabPage.leftBar.waitFor();
    // await expect(leftTabPage.leftBar).toBeVisible();

    // await expect(leftTabPage.myCasesLink).toBeVisible();
    // await leftTabPage.myCasesLink.waitFor();

    // // Click my cases left tab
    // await leftTabPage.clickMyCases();

    await page.getByRole('listitem').filter({ hasText: 'My Cases' }).locator('div').click();


    // Check if the case exists for the current login user
    if (await myCasesPage.clickOD('SAO')) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      // Re-login with the new user
      await page.reload(); // Reload the page to start fresh

      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      await login(page, 'uat_redzuan', 'u@T_redzuan');
      //await login(page, "roliana.pks", "u@T_roliana");
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
  await remarksPage.textboxIO.fill('test sao');

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

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  const medicalOpinionPagePage = new MedicalOpinionPage(page2);
  await medicalOpinionPagePage.medicalOpinionButton.waitFor({
    state: 'visible',
  });
  await medicalOpinionPagePage.clickMedicalOpinionButton();

  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickSAORecommendationButton();

  //temporary solution

  const approvalPage = new ApprovalPage(page2);
  await approvalPage.approvalButton.waitFor({ state: 'visible' });
  await approvalPage.clickApprovalButton();

  await expect(
    page2.getByRole('heading', { name: 'Approval', exact: true }),
  ).toBeVisible();
  await expect(page2.locator('#Approval')).toContainText('Approval');

  await expect(approvalPage.actionApprove).toBeVisible();
  await approvalPage.actionApprove.waitFor();
  await approvalPage.selectSAOActionOption();

  const medicalCertificatePage = new MedicalCertificatePage(page2);
  await medicalCertificatePage.clickHusInfoButton();
  await medicalCertificatePage.clickEditButton();
  await medicalCertificatePage.selectHusApprovalStatus();
  await medicalCertificatePage.submitButton().click();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

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
