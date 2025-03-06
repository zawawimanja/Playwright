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
import { AccidentInformationPage } from '../../../pages/accident_info';
import { CalendarPage } from '../../../utils/calendar';
import { TimePage } from '../../../utils/time';
import { SubmitPage } from '../../../pages/submit';
import { CasesPage } from '../../../pages/cases';
import { ButtonPage } from '../../../utils/button';
import { readCSV } from '../../../helper/csvHelper'; // Import the CSV helper
// filepath: /c:/Users/aaror/Downloads/Playwright/e2e/Prereg/S2 - ILAT-BI2PI/test-ILAT-PK.spec.ts
const fs = require('fs');
const path = require('path');

test.beforeEach(async ({ page }) => {
  await login(page, 'afzan.pks', 'u@T_afzan');
});

export let schemeRefValue: string;

test.only('Prereg PK NTA HUK EFT MC', async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const timePage = new TimePage(page);

  // Read data from CSV
  const csvFilePath = path.resolve(__dirname, '../../../testData/testData.csv'); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();

  leftTabPage.clickHUKPreregistration();
  await preregPage.selectIdentificationTypeHUK(data.identificationType);

  await preregPage.fillIdentificationNoHUK(data.identificationNo);

  // Click search button
  await page
    .frameLocator('#baristaPageOut')
    .locator('#previewRow4 div')
    .filter({ hasText: 'Response Status' })
    .first()
    .click();
  await preregPage.clickSearchButton();

  const page13Promise = page.waitForEvent('popup');
  await page
    .frameLocator('#baristaPageOut')
    .getByRole('button', { name: 'Open' })
    .click();
  const page1 = await page13Promise;

  await page.waitForLoadState('networkidle');

  await page1
    .getByRole('button', { name: 'Case Information', exact: true })
    .click();
  await page1.getByRole('button', { name: 'Application Information' }).click();
  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);

  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await page1.getByRole('button', { name: 'FHUS Case Information' }).click();
  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  const supportingDocumentPage = new SupportingDocumentPage(page1);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page1);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage = new ButtonPage(page1);
  buttonPage.clickYes();

  const page2Promise = page1.waitForEvent('popup');
  const page2 = await page2Promise;

  // Wait for the element to be present
  await page2.getByLabel('Scheme Ref No:').waitFor();

  const schemeRefValue = await page2.getByLabel('Scheme Ref No:').inputValue();
  console.log('SRN from locator: ' + schemeRefValue);
  const filePath = path.resolve(__dirname, 'schemeRefValue.json');
  fs.writeFileSync(filePath, JSON.stringify({ schemeRefValue }));

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log('File schemeRefValue.json exists at path: ' + filePath);
  } else {
    console.log('File schemeRefValue.json does not exist at path: ' + filePath);
  }

  await page2.getByRole('button', { name: 'Close' }).click();
});
