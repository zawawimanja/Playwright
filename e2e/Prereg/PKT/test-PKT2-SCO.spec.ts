import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { MedicalOpinionPage } from '../../../pages/medical_opinion';
import { PreparerInformationPage } from '../../../pages/preparer_info';
import { CaseInformationPage } from '../../../pages/case_info';
import { AppointmentPage } from '../../../pages/appointment';
import { InconsistentDoubtfulPage } from '../../../pages/inconsistentdoubtful';
import { CasesPage } from '../../../pages/cases';
import { SubmitPage } from '../../../pages/submit';
import { MyCasesPage } from '../../../pages/mycases';
import { HeaderPage } from '../../../pages/header';
import { ButtonPage } from '../../../utils/button';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  //await login(page, 'atilia.pks', 'u@T_atilia');
  await login(page, "nazira.pks", "u@T_nazira");
});

test('Prereg SCO PKT', async ({ page }) => {
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init('PKT');

  let loginUser = 'atilia.pks';
  let caseFound = false;

  while (!caseFound) {
 

    // Click my cases left tab
   await page.getByRole('listitem').filter({ hasText: 'My Cases' }).locator('div').click();



    // Check if the case exists for the current login user
    if (await myCasesPage.clickDeath('SCO')) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      // Re-login with the new user
      await page.reload(); // Reload the page to start fresh

      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      await login(page, 'nazira.pks', 'u@T_nazira');
      //await login(page, "atilia.pks", "u@T_atilia");
    }
  }

  const pagePromise = page.waitForEvent('popup');
  await page
    .frameLocator('#baristaPageOut')
    .frameLocator('#APWorkCenter')
    .getByText('Open Task')
    .click();
  const page2 = await pagePromise;

  await page2.waitForLoadState('networkidle');

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

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButtonPKT();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  await page2.getByRole('button', { name: 'Death Info' }).click();

  await page2.getByLabel('State Place of Death*').selectOption('200701');
  await page2.getByLabel('State Place of Bury*').selectOption('200701');


  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  
  //appointment
  const appointmentPage = new AppointmentPage(page2);
  await appointmentPage.clickAppointmentButton();

  //add Investigation Document

  const medicalOpinionPage1 = new MedicalOpinionPage(page2);
  await medicalOpinionPage1.clickMedicalOpinionButton();

  await page2
    .getByRole('button', { name: 'Invalidity Scheme Qualifying' })
    .click();
  await page2
    .getByRole('button', { name: 'Contribution Based on Section' })
    .click();
  await page2.getByRole('button', { name: 'Wages Information (SI)' }).click();

  await page2.getByRole('button', { name: 'Dependent Info' }).click();

  await page2.getByRole('button', { name: 'FPM Info' }).click();

  const page4Promise = page2.waitForEvent('popup');
  await page2.getByRole('button', { name: 'View/Edit' }).click();
  const page4 = await page4Promise;
  await page4.getByLabel('Eligible as Claimant*').selectOption('90303');
  await page4.getByRole('button', { name: 'Submit' }).click();

  await page2.getByRole('button', { name: 'SCO Recommendation NTD' }).click();
  await page2.getByLabel('Action*').selectOption('10209');

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

  // Debugging: Check if the popup page is correctly referenced
  console.log('Popup page URL:', page3.url());

  // Wait for the element to be present
  await page3.waitForLoadState('networkidle');

  // Additional wait to ensure the page is fully loaded
  await page3.waitForTimeout(10000);

  const schemeRefNoTextbox = await page3.locator('#SchemeRefNo');
  console.log(
    'Scheme Ref No textbox is visible using page3' + schemeRefNoTextbox,
  );

  // Perform other actions as needed
  await page3.getByRole('button', { name: 'Close' }).click();
});
