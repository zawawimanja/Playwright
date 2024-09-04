import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/login';


test.beforeEach(async ({ page }) => {

  const loginPage = new LoginPage(page);
  await loginPage.navigateToLogin();
  await loginPage.login("afzan.pks", "u@T_afzan");
});

test('Prereg PK FOT', async ({ page }) => {

  await page.waitForSelector(".ap-Menu")
  await expect(page.locator('.ap-Menu')).toBeVisible();
  await expect(page.locator('#page-builder-root')).toContainText('HomePre-RegistrationHUK Pre-RegistrationCreate RevisionMy CasesAppointmentsInsured Person SearchToolsSSNCommon ListingPermanent RepresentativeAnnual DeclarationReemployment Scheduler');

  //await page.waitForSelector("#baristaPageOut #formPreview")
  await page.frameLocator('#baristaPageOut').locator('#formPreview').waitFor();
  //await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#previewPanel')).toBeVisible();


  await expect(page.getByRole('link', { name: 'Pre-Registration', exact: true })).toBeVisible();
  await expect(page.locator('#page-builder-root')).toContainText('Pre-Registration');
  await page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();





  await page.frameLocator('#baristaPageOut').locator('#NoticeTypePreReg').selectOption('Death - PKT');


  await expect(page.frameLocator('#baristaPageOut').getByText('Does Insured Person Still in')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField781')).toContainText('Does Insured Person Still in Employment?');
  await page.frameLocator('#baristaPageOut').getByLabel('Does Insured Person Still in').selectOption('Yes');



  await page.frameLocator('#baristaPageOut').getByLabel('Notice and Benefit Claim Form').selectOption('Others');

  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').click();
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').fill('850416085679');



  await page.frameLocator('#workbasket').locator('#ctrlField800').click();
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Search' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Next' }).click();
  const page1 = await page1Promise;

  await page1.waitForLoadState('load'); // Wait until the "load" event

  await page1.waitForSelector('#formPreview', { timeout: 60000 });
  await expect(page1.locator('#formPreview')).toBeVisible();

  const btnClose = page1.locator('#btnClose');

  if (await btnClose.isVisible()) {
    await btnClose.click();
  } else {
    console.log('Button not found, continuing...');
  }

  await page1.waitForLoadState('load'); // Wait until the "load" event

  await page1.waitForSelector('#sectionTabs', { state: 'visible', timeout: 600000 });
  await expect(page1.getByRole('button', { name: 'Remarks', exact: true })).toBeVisible();
  await expect(page1.locator('#sectionTabs')).toContainText('Remarks');
  await page1.getByRole('button', { name: 'Remarks' }).click();

  await page1.getByRole('button', { name: 'Case Information' }).click();

  await expect(page1.getByRole('button', { name: 'Insured Person Information' })).toBeVisible();
  await expect(page1.locator('#sectionTabs')).toContainText('Insured Person Information');
  await page1.getByRole('button', { name: 'Insured Person Information' }).click();
  await page1.getByRole('button', { name: 'Insured Person Information' }).click();
  await page1.getByLabel('Notice and Benefit Claim Form Received Date*').click();
  await page1.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption('2020');
  await page1.getByRole('link', { name: '1', exact: true }).click();
  await page1.getByLabel('Occupation (Based on Form 34)*').click();
  await page1.getByLabel('Occupation (Based on Form 34)*').fill('cs');
  await page1.getByLabel('Address*').click();
  await page1.getByLabel('Address*').fill('Taman Abadi');
  await page1.locator('#AddressInsuredPersonInfo2').click();
  await page1.locator('#AddressInsuredPersonInfo2').fill('Lorong 10');
  await page1.locator('#AddressInsuredPersonInfo3').click();
  await page1.locator('#AddressInsuredPersonInfo3').fill('Jalan 1');
  await page1.getByLabel('State*').selectOption('200714');
  await page1.getByLabel('City*').selectOption('201460');
  await page1.getByLabel('Postcode*').click();
  await page1.getByLabel('Postcode*').fill('51000');
  await page1.getByLabel('Nationality*').selectOption('201749');


  await page1.getByRole('button', { name: 'Death Info' }).click();
  await page1.getByLabel('Date of Death*').click();
  await page1.getByRole('combobox').nth(3).selectOption('2023');
  await page1.getByRole('combobox').nth(2).selectOption('7');
  await page1.getByRole('link', { name: '9', exact: true }).click();
  await page1.getByLabel('Cause of Death*').fill('test');
  await page1.getByLabel('Marital Status of Insured').selectOption('90501');
  await page1.getByLabel('Periodical Payment Receiver?').selectOption('1');


  await page1.getByRole('button', { name: 'Dependent Info' }).click();
  await page1.getByLabel('Dependent Information').selectOption('No');


  await page1.getByRole('button', { name: 'FPM Info' }).click();

  await expect(page1.locator('#sectionTabs')).toContainText('Wages Information');
  await expect(page1.getByRole('button', { name: 'Wages Information' })).toBeVisible();
  await page1.getByRole('button', { name: 'Wages Information' }).click();


  await expect(page1.getByRole('button', { name: 'Preferred SOCSO Office' })).toBeVisible();
  await expect(page1.locator('#sectionTabs')).toContainText('Preferred SOCSO Office');
  await page1.getByRole('button', { name: 'Preferred SOCSO Office' }).click();
  await expect(page1.getByRole('button', { name: 'Preferred SOCSO Office' })).toBeVisible();
  await page1.getByLabel('State*').selectOption('200701');
  await page1.getByLabel('SOCSO Office*').selectOption('200419');


  await page1.getByRole('button', { name: 'Confirmation of Dependent/' }).click();




  await expect(page1.getByRole('button', { name: 'Supporting Document' })).toBeVisible();
  await expect(page1.locator('#sectionTabs')).toContainText('Supporting Document');
  await page1.getByRole('button', { name: 'Supporting Document' }).click();


  await expect(page1.getByRole('button', { name: 'Preview & Submission' })).toBeVisible();
  await expect(page1.locator('#sectionTabs')).toContainText('Preview & Submission');
  await page1.getByRole('button', { name: 'Preview & Submission' }).click();
  await page1.getByRole('button', { name: 'Show Preview' }).click();
  await page1.waitForLoadState('load'); // Wait until the "load" event


  await page1.locator('button', { hasText: 'Submit' }).waitFor({ state: 'visible', timeout: 600000 });


  await page1.getByRole('button', { name: 'Submit' }).click();
  await page1.getByRole('button', { name: 'No' }).click();
  await page1.goto('http://barista-uat.perkeso.gov.my:13491/ApplicationBuilder/eFormRender.html?WID=980200505680652711FF669F1B2980E6');
  // await expect(page1.getByLabel('Scheme Ref No.')).toBeVisible();
  // await page1.getByRole('button', { name: 'Submit' }).click();



});