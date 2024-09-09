import { test, expect } from '@playwright/test';
import { login } from '../../utils/base'; // Import from base.ts



test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

test('Prereg PK Accident', async ({ page }) => {

  await page.waitForSelector('#baristaPageOut', { state: 'visible', timeout: 600000 });
  await page.frameLocator('#baristaPageOut').locator('#formPreview').isVisible();
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Home Page' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#previewPanel')).toContainText('Home Page');
  await page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();


  await page.waitForLoadState('load'); // Wait until the "load" event
  // Now perform the actions you need
  await page.waitForSelector('#baristaPageOut', { state: 'visible', timeout: 600000 });
  await page.frameLocator('#baristaPageOut').locator('#formPreview').isVisible();

  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Pre-Registration' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('h2')).toContainText('Pre-Registration');
  await expect(page.frameLocator('#baristaPageOut').getByRole('heading', { name: 'Search Insured Person &' })).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#Heading31')).toContainText('Search Insured Person & Employer Registration Status');

  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField596').getByText('Notice Type')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField596')).toContainText('Notice Type');
  await page.frameLocator('#baristaPageOut').locator('#NoticeTypePreReg').selectOption('Accident');





  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField751').getByText('Accident Date')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField751')).toContainText('Accident Date');
  await page.frameLocator('#baristaPageOut').getByLabel('Accident Date*').click();
  await page.frameLocator('#baristaPageOut').getByRole('combobox').nth(3).selectOption('2020');
  await page.frameLocator('#baristaPageOut').getByRole('combobox').nth(2).selectOption('7');
  await page.frameLocator('#baristaPageOut').getByRole('link', { name: '4', exact: true }).click();



  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField767').getByText('Accident Time')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField767')).toContainText('Accident Time');
  await page.frameLocator('#baristaPageOut').getByLabel('Accident Time*').click();
  await page.frameLocator('#baristaPageOut').locator('dd').filter({ hasText: '12 am01 am02 am03 am04 am05' }).getByRole('combobox').selectOption('13');
  await page.frameLocator('#baristaPageOut').getByRole('combobox').nth(3).selectOption('16');
  await page.frameLocator('#baristaPageOut').getByRole('combobox').nth(4).selectOption('15');



  await page.frameLocator('#baristaPageOut').locator('#row5column3').click();


  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField597').getByText('Identification Type')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField597')).toContainText('Identification Type');
  await page.frameLocator('#baristaPageOut').getByLabel('Identification Type*').selectOption('2');


  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField634').getByText('Identification No.')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField634')).toContainText('Identification No.');
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').click()
  await page.frameLocator('#baristaPageOut').getByLabel('Identification No.*').fill('891007146398');



  await expect(page.frameLocator('#baristaPageOut').getByText('Employer Code*')).toBeVisible();
  await expect(page.frameLocator('#baristaPageOut').locator('#ctrlField641')).toContainText('Employer Code');
  await page.frameLocator('#baristaPageOut').getByLabel('Employer Code*').click()
  await page.frameLocator('#baristaPageOut').getByLabel('Employer Code*').fill('B3200086169Z');
  await page.frameLocator('#workbasket').locator('#ctrlField800').click();

  await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Search' }).click();



  // const page1Promise = page.waitForEvent('popup');
  // await page.frameLocator('#baristaPageOut').getByRole('button', { name: 'Next' }).click();
  // const page1 = await page1Promise;

  // await page1.waitForSelector('#formPreview', { state: 'visible' });

  // await expect(page1.locator('#formPreview')).toBeVisible();

  // await page.waitForLoadState('load'); // Wait until the "load" event

  // await page1.waitForSelector('#sectionTabs', { state: 'visible', timeout: 600000 });
  // await expect(page1.locator('#sectionTabs')).toContainText('Remarks');


});