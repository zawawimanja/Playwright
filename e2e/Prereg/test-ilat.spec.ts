import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page }) => {

  await page.goto('http://barista-uat.perkeso.gov.my:13491/login/ActiveDirectory?returnUrl=%2F');
  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('afzan.pks');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('u@T_afzan');
  await page.getByRole('button', { name: 'Sign In' }).click();
});

test('Prereg PK ILAT', async ({ page }) => {

  await page.waitForLoadState('networkidle'); // Wait until network activity is idle
  await page.frameLocator('#baristaPageOut').locator('#formPreview').isVisible();
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#previewPanel')).toContainText('Home Page');
  await page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();


  await page.waitForLoadState('load'); // Wait until the "load" event
  // Now perform the actions you need
  await page.frameLocator('#baristaPageOut').locator('#formPreview').isVisible();

  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Pre-Registration' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('h2')).toContainText('Pre-Registration');
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Search Insured Person &' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#Heading31')).toContainText('Search Insured Person & Employer Registration Status');
  await page.frameLocator('#baristaPageOut').locator('#NoticeTypePreReg').selectOption('ILAT');
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField596').getByText('Notice Type')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField596')).toContainText('Notice Type');
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField597').getByText('Identification Type')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField597')).toContainText('Identification Type');
  await expect(page.frameLocator('#baristaPageOut').getByText('Notice and Benefit Claim Form')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField769')).toContainText('Notice and Benefit Claim Form Submission by');
  await page.frameLocator('#baristaPageOut').getByLabel('Notice and Benefit Claim Form').selectOption('Others');
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField634').getByText('Identification No.')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField634')).toContainText('Identification No.');

  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').click();
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').fill('850416085679');
  await page.frameLocator('#baristaPageOut').locator('#previewRow6 div').filter({ hasText: 'ClaimFormSubmissionByList' }).first().click();
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Search' }).click();


  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Next' }).click();
  const page1 = await page1Promise;

  await page1.waitForSelector('#formPreview', { state: 'visible' });

  await expect(page1.locator('#formPreview')).toBeVisible();

  await page.waitForLoadState('load'); // Wait until the "load" event

  await page1.waitForSelector('#sectionTabs', { state: 'visible', timeout: 600000 });
  await expect(page1.locator('#sectionTabs')).toContainText('Remarks');








});