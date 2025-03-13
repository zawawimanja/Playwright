import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { OccupationalDiseasePage } from '../../../pages/od_info';
import { EmployerInfoPage } from '../../../pages/employer_info';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { CertificationByEmployerPage } from '../../../pages/cert_employer';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { RecommendationPage } from '../../../pages/recommendation';
import { PreparerInformationPage } from '../../../pages/preparer_info';
import { CaseInformationPage } from '../../../pages/case_info';
import { InconsistentDoubtfulPage } from '../../../pages/inconsistentdoubtful';
import { CalendarPage } from '../../../utils/calendar';
import { CasesPage } from '../../../pages/cases';
import { SubmitPage } from '../../../pages/submit';
import { MyCasesPage } from '../../../pages/mycases';
import { MBSessionPage } from '../../../pages/mb_session';
import { ButtonPage } from '../../../utils/button';
import { HeaderPage } from '../../../pages/header';

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  //await login(page, "hilmi.pks", "u@T_hilmi");
  await login(page, 'aslam.pks', 'u@T_aslam');
});

export let schemeRefValue: string;
test('Prereg MB OD', async ({ page }) => {
  let value = '';
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init('HUK');

  let loginUser = 'hilmi.pks';
  let caseFound = false;

  while (!caseFound) {
    await leftTabPage.leftBar.waitFor();
    await expect(leftTabPage.leftBar).toBeVisible();

    await expect(leftTabPage.myCasesLink).toBeVisible();
    await leftTabPage.myCasesLink.waitFor();

    // Click my cases left tab
    await leftTabPage.clickMyCases();

    // Check if the case exists for the current login user
    if (await myCasesPage.clickAccident('HUK MB')) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      //  await login(page, "aslam.pks", "u@T_aslam");
      await login(page, 'hilmi.pks', 'u@T_hilmi');
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

  await page.waitForLoadState('networkidle');
  await page.screenshot({ path: 'debug_screenshot.png' });

  const page3Promise = page2.waitForEvent('popup');
  const buttonPage = new ButtonPage(page2);
  await buttonPage.clickNew();

  const page3 = await page3Promise;
  const buttonPage3 = new ButtonPage(page3);
  await buttonPage3.clickAdd();

  const calendarPage = new CalendarPage(page3);

  const mbSessionPage = new MBSessionPage(page3);
  await page3.waitForLoadState('networkidle');

  //session venue hkl
  await mbSessionPage.selectSessionVenue('HUK');

  //session date
  calendarPage.clickDate('Session DateHUK');
  await calendarPage.selectDateInsuredPersonPage('2023', '1', '30');

  //permanent Disability
  await page3
    .locator('#ctrlField1055')
    .getByRole('combobox')
    .selectOption('9608001');

  //mmi yes default
  await expect(page3.getByText('MMI Achieved')).toBeVisible();
  await mbSessionPage.selectmmiAchievedHUK();

  //ass type
  await mbSessionPage.selectAssessmentTypeHUK('Provisional');

  //check additional assesment for session assesment
  await mbSessionPage.setsessionAssesmentHUK('25');

  //Get  assessment type value
  const selectedValue = await page3
    .locator('[id^="HUKSF1AssessmentType-"] option:checked')
    .textContent();

  console.log(selectedValue + ' type');

  //if choose provisional have assessment date
  if (selectedValue === 'Provisional') {
    calendarPage.clickDate('Provisional DateHUK');
    await calendarPage.selectDateInsuredPersonPage('2023', '8', '15');
  }

  // //remark recommendation
  // await expect(mbSessionPage.remarkRecommendation).toContainText("Remarks for Recommendation for Rehab");

  // // //remarks textbox
  // await expect(page3.locator("#previewPanel")).toContainText("Remarks");

  buttonPage3.clickOK();
  buttonPage3.clickSubmit();
  buttonPage3.clickYes();

  const remarksPage = new RemarksPage(page2);

  await remarksPage.remarksButton.waitFor({ state: 'visible' });
  await expect(remarksPage.remarksButton).toBeVisible();
  await remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.click();
  await remarksPage.textboxIO.fill('test mb');
  await remarksPage.saveRemarksButton.click();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationHUKButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  await page2.reload();
  await page2.waitForLoadState('networkidle');

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.previewSubmissionButton.waitFor({
    state: 'visible',
  });
  await expect(previewSubmissionPage.previewSubmissionButton).toBeVisible();
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage1 = new ButtonPage(page2);
  buttonPage1.clickYes();

  const page4Promise = page2.waitForEvent('popup');
  const page4 = await page4Promise;

  // Wait for the element to be present
  await page4.getByLabel('Scheme Ref No:').waitFor();

  // Perform other actions as needed
  await page4.getByRole('button', { name: 'Close' }).click();
});
