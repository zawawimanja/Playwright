import { test, expect } from '@playwright/test';

test('Prereg PK OD', async ({ page }) => {

  await page.goto('http://barista-uat.perkeso.gov.my:13491/login/ActiveDirectory?returnUrl=%2F');


  await page.getByPlaceholder('User Name').click();
  await page.getByPlaceholder('User Name').fill('afzan.pks');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('u@T_afzan');
  await page.getByRole('button', { name: 'Sign In' }).click();
  await expect(page.getByRole('link', { name: 'Pre-Registration', exact: true })).toBeVisible();
  await expect(page.locator('#page-builder-root')).toContainText('Pre-Registration');
  await page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();





  await page.frameLocator('#baristaPageOut').locator('#NoticeTypePreReg').selectOption('OD');

  await page.frameLocator('#baristaPageOut').getByLabel('Notice and Benefit Claim Form').selectOption('Others');
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').click();
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').fill('820214045129');
  await page.frameLocator('#baristaPageOut').getByLabel('Employer Code*').click();
  await page.frameLocator('#baristaPageOut').getByLabel('Employer Code*').fill('B3200086169Z');
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Search' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Next' }).click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Insured Person Information' }).click();
  await page1.getByRole('button', { name: 'Employer Information' }).click();
  await page1.getByRole('button', { name: 'Occupational Disease' }).click();
  await page1.getByRole('button', { name: 'Medical Certificate' }).click();
  await page1.getByRole('button', { name: 'Wages Information' }).click();
  await page1.getByRole('button', { name: 'Preferred SOCSO Office' }).click();
  await page1.getByRole('button', { name: 'Certification by Employer' }).click();
  await page1.getByRole('button', { name: 'Bank Information' }).click();
  await page1.getByRole('button', { name: 'Confirmation of Insured' }).click();
  await page1.getByRole('button', { name: 'Supporting Document' }).click();
  await page1.getByRole('button', { name: 'Preview & Submission' }).click();


});