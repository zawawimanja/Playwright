import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { BankInformationPage } from '../../../pages/bank_info';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { RecommendationPage } from '../../../pages/recommendation';
import { MedicalOpinionPage } from '../../../pages/medical_opinion';
import { PreparerInformationPage } from '../../../pages/preparer_info';
import { CaseInformationPage } from '../../../pages/case_info';
import { InconsistentDoubtfulPage } from '../../../pages/inconsistentdoubtful';
import { CalendarPage } from '../../../utils/calendar';
import { CasesPage } from '../../../pages/cases';
import { SubmitPage } from '../../../pages/submit';
import { MyCasesPage } from '../../../pages/mycases';
import { MBSessionPage } from '../../../pages/mb_session';
import { HeaderPage } from '../../../pages/header';
import { InvalidityInfoPage } from '../../../pages/invalidity_info';
import { WagesInfoPage } from '../../../pages/wages_info';
import { ButtonPage } from '../../../utils/button';
test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, "hilmi.pks", "u@T_hilmi");
  //await login(page, 'aslam.pks', 'u@T_aslam');
});

test('Prereg MB ILAT', async ({ page }) => {
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init('NTI');

  let loginUser = 'hilmi.pks';
  let caseFound = false;

  while (!caseFound) {
 
    await page.getByRole('listitem').filter({ hasText: 'My Cases' }).locator('div').click();

    // Check if the case exists for the current login user
    if (await myCasesPage.clickILAT('MB')) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
    // await login(page, 'hilmi.pks', 'u@T_hilmi');
       await login(page, "aslam.pks", "u@T_aslam");
    }
  }

  const pagePromise = page.waitForEvent('popup');
  await page.waitForLoadState('networkidle');
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

  const page3Promise = page2.waitForEvent('popup');
  await page.waitForLoadState('networkidle');
 // await page2.getByLabel('Invalidity Decision*').selectOption('Yes');
  await page2.getByRole('button', { name: 'New' }).click();

  const page4 = await page3Promise;
  await page4.getByRole('button', { name: 'Add' }).click();

  await page.waitForLoadState('networkidle');

  //session venue
  const mbSessionPage = new MBSessionPage(page4);
  await mbSessionPage.selectSessionVenue('ILAT');
  //session date

  const calendarPage = new CalendarPage(page4);
  calendarPage.clickDate('Session DateILAT');
  await calendarPage.selectDateInsuredPersonPage('2023', '8', '1');
  //result

  await mbSessionPage.setResultILat('9608101');
  //els
  // await page4.locator("#ctrlField1044").getByRole("combobox").selectOption("Yes");
  //recommendation for rehab
  //await page4.locator("#ILATSF1RecommendationForRehab-bea1-46656-b97e-24ab").selectOption("Yes");

//morbid date for bi and >60
const calendarPage1 = new CalendarPage(page4);

const morbidDateElement = await mbSessionPage.getMorbidDateElement(); // You'll need to add this method
if (await morbidDateElement.isVisible()) {
  calendarPage1.clickDate('Morbid Date');
//   await page4.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('1980');

// await page4.locator('#ui-datepicker-div').getByRole('combobox').first().selectOption('1');

// await page4.getByRole('link', { name: '1', exact: true }).click();

await calendarPage1.selectDateInsuredPersonPage('1990', '1', '1');

    console.log('Morbid date was enabled and selected');
} else {
    console.log('Morbid date input is disabled - skipping selection');
}


  const button = new ButtonPage(page4);
  await button.clickOK();
  await button.clickSubmit();
  await button.clickYes();

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();

  await expect(remarksPage.sectionTabs).toContainText('Remarks');
  //temporary solution

  await remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textboxSAO.fill('test mb');
  await remarksPage.saveRemarksButton.click();

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //add reference notice information
  const invalidtyInformation = new InvalidityInfoPage(page2);
  await invalidtyInformation.clickInvalidityInformation();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  //bank info
  const bankInformationPage = new BankInformationPage(page2);
  await bankInformationPage.clickBankInformationButton();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  //qc

  await page2.getByRole('button', { name: 'Scheme Qualifying' }).click();

  const medicalOpinionPage = new MedicalOpinionPage(page2);
  await medicalOpinionPage.medicalOpinionButton.waitFor();
  await expect(medicalOpinionPage.medicalOpinionButton).toBeVisible();
  await medicalOpinionPage.clickMedicalOpinionButton();

  //temporary solution
  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickRecommendationButton();

  //wages
  const wagesInfoPage = new WagesInfoPage(page2);
  await wagesInfoPage.clickSIWagesInfoButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  await page2.reload();

  await page2.waitForLoadState('networkidle');

  await page2.waitForTimeout(15000);

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage = new ButtonPage(page2);
  buttonPage.clickYes();

  const page5Promise = page2.waitForEvent('popup');
  await page2.waitForLoadState('networkidle');
  const page5 = await page5Promise;

  // Wait for the element to be present
  await page5.getByLabel('Scheme Ref No:').waitFor();

  // Perform other actions as needed
  await page5.getByRole('button', { name: 'Close' }).click();
});
