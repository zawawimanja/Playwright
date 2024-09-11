import { test, expect } from '@playwright/test';
import { login } from '../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../pages/prereg';


test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

test('Prereg PK ILAT', async ({ page }) => {
  const preRegistrationPage = new PreregistrationPage(page);
  await page.waitForLoadState('networkidle'); // Wait until network activity is idle
  await page.frameLocator('#baristaPageOut').locator('#formPreview').isVisible();
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#previewPanel')).toContainText('Home Page');
  await page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();


  await page.waitForLoadState('load');

  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Pre-Registration' })).toBeVisible({
    timeout: 60000
  });
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Pre-Registration' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('h2')).toContainText('Pre-Registration');
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Search Insured Person &' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#Heading31')).toContainText('Search Insured Person & Employer Registration Status');

  preRegistrationPage.selectNoticeType('ILAT')

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