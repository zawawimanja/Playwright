import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { WagesInfoPage } from '../../../pages/wages_info';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { BankInformationPage } from '../../../pages/bank_info';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { CalendarPage } from '../../../utils/calendar';
import { SubmitPage } from '../../../pages/submit';
import { CasesPage } from '../../../pages/cases';
import { InvalidityInfoPage } from '../../../pages/invalidity_info';
import { ButtonPage } from '../../../utils/button';
import { readCSV } from '../../../helper/csvHelper';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import { validateConstants } from '../../../utils/validateConstants';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, 'afzan.pks', 'u@T_afzan');
});
//test
export let schemeRefValue: string;

// Load constants from JSON file
const constants = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../constants.json'), 'utf-8'),
);

// Validate constants
validateConstants(constants);

test.only('Prereg PK ILAT MC EFT', async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);

  // Read data from CSV
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const csvFilePath = path.resolve(__dirname, '../../../testData/testData.csv'); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[1]; // U
  await page.waitForLoadState('networkidle');

  await page.waitForLoadState('networkidle');
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#formPreview'),
  ).toBeVisible();

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('heading', { name: constants.homePageHeading }),
  ).toBeVisible();
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#previewPanel'),
  ).toContainText(constants.homePageText);

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('img', { name: constants.socsoLogoAltText }),
  ).toBeVisible();

  await page.waitForLoadState('networkidle');

  
  leftTabPage.clickPreregistration();

   await page.waitForLoadState('networkidle');
    await expect(
      page
        .locator('#baristaPageOut')
        .contentFrame()
        .getByRole('heading', { name: constants.preRegistrationHeading }),
    ).toBeVisible();
    await expect(
      page.locator('#baristaPageOut').contentFrame().locator('h2'),
    ).toContainText(constants.preRegistrationText);
  
    await expect(
      page
        .locator('#baristaPageOut')
        .contentFrame()
        .getByRole('heading', { name: constants.searchInsuredPersonHeading }),
    ).toBeVisible();
    await expect(
      page.locator('#baristaPageOut').contentFrame().locator('#Heading31'),
    ).toContainText(constants.searchInsuredPersonText);
  
    await expect(
      page
        .locator('#baristaPageOut')
        .contentFrame()
        .locator('#ctrlField596')
        .getByText(constants.noticeTypeText),
    ).toBeVisible();
    await expect(
      page.locator('#baristaPageOut').contentFrame().locator('#ctrlField596'),
    ).toContainText(constants.noticeTypeText);


  await preregPage.noticeTypePreRegSelect.waitFor({ state: 'visible' });
  await preregPage.selectNoticeTypePreRegOption('ILAT');
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe('ILAT');

  // User Select Identification Type = New IC
  await preregPage.selectIdentificationType('2');
  const selectedIdentificationTypeText =
    await preregPage.getSelectedIdentificationTypeText();

  expect(selectedIdentificationTypeText).toBe(data.identificationType);

  await preregPage.fillIdentificationNo(data.identificationNo);

  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data.identificationNo);

  await preregPage.noticeAndBenefitClaimFormSelect.waitFor({
    state: 'visible',
  });
  await preregPage.selectNoticeAndBenefitClaimFormOption(
    data.noticeAndBenefitClaimForm,
  );

  const NoticeAndBenefitClaimFormOptionText =
    await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe(
    data.noticeAndBenefitClaimForm,
  );

  // Click search button
  await preregPage.clickSearchButton();


  const pagePromise = page.waitForEvent('popup');
  await preregPage.clickNewClaimButton();

  const page1 = await pagePromise;
  await page1.waitForLoadState('networkidle');
  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText('Remarks');
  remarksPage.clickRemarksButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage('2024', '12', '28');
  await insuredPersonInfoPage.fillOccupationILAT('CS');

  await insuredPersonInfoPage.fillAddress1('Taman Abadi');

  await insuredPersonInfoPage.selectState('200714');
  await insuredPersonInfoPage.selectCity('201460');
  await insuredPersonInfoPage.fillPostcode('51000');
  await insuredPersonInfoPage.selectNationalityILAT();

  const invalidtyInformation = new InvalidityInfoPage(page1);

  await invalidtyInformation.clickInvalidityInformation();
  await invalidtyInformation.selectInsuredPersonEmployment('No');
  await page1.getByLabel('Date of Cessation of').click();
  await calendarPage.selectDateInsuredPersonPage('2004', '1', '1');

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  //johor
  preferredSOCSOOfficePage.selectSOCSOState('200701');
  await preferredSOCSOOfficePage.selectSOCSOOffice('200419');

  // preferredSOCSOOfficePage.selectSOCSOState('200714');
  // await preferredSOCSOOfficePage.selectSOCSOOffice('200507');

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel('Account No.*', { exact: true }).selectOption('Yes');
  await bankInformationPage.selectAccountNo('Yes');
  await bankInformationPage.selectBankLocation('204101');
  await bankInformationPage.selectBankNameILAT('802121');
  await bankInformationPage.selectBankAccountType('204401');
  await bankInformationPage.fillBankBranch('KL');
  await bankInformationPage.fillBankAccountNo('12345678');

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page1);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();
  await confirmationOfInsuredPage.checkCompletedCheckbox();

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

  // Perform other actions as needed
  await page2.getByRole('button', { name: 'Close' }).click();
});

test('Prereg PK ILAT MC Bankcrupty', async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption('ILAT');
  // Verify the selected option text

  await preregPage.selectIdentificationType('2');
  const selectedIdentificationTypeText =
    await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe('New IC');

  await preregPage.fillIdentificationNo('890218265181');
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  // expect(filledIdentificationNo).toBe("960618145171");

  await preregPage.selectNoticeAndBenefitClaimFormOption('Insured Person');
  await expect(preregPage.noticeAndBenefitClaimFormSelect).toHaveValue(
    'Insured Person',
  );
  await expect(preregPage.noticeAndBenefitClaimFormSelect).toContainText(
    'Insured Person',
  );

  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const pagePromise = page.waitForEvent('popup');
  await preregPage.clickNextButton();
  const page1 = await pagePromise;
  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
  remarksPage.clickRemarksButton();
  // await remarksPage.remarksButton.waitFor();
  // await expect(remarksPage.remarksButton).toBeVisible();
  // await expect(remarksPage.sectionTabs).toContainText("Remarks");
  // await remarksPage.remarksButton.waitFor();
  // await remarksPage.addRemarksButton.click();
  // await remarksPage.textbox.fill("test");
  // await remarksPage.saveRemarksButton.click();

  //error message
  //if exist check close button and if not continue

  // Check if the "Close" button exists and is visible
  const closeButton = page1.getByRole('button', { name: 'Close' });

  if (await page1.getByLabel('Message').isVisible()) {
    await page1.getByLabel('Message').waitFor();
    await closeButton.waitFor();
    await closeButton.click(); // Click the button if it exists
  }

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage('2023', '1', '1');
  await insuredPersonInfoPage.fillOccupationILAT('CS');

  await insuredPersonInfoPage.fillAddress1('Taman Abadi');

  await insuredPersonInfoPage.selectState('200714');
  await insuredPersonInfoPage.selectCity('201460');
  await insuredPersonInfoPage.fillPostcode('51000');
  await insuredPersonInfoPage.selectNationalityILAT();

  const invalidtyInformation = new InvalidityInfoPage(page1);

  await invalidtyInformation.clickInvalidityInformation();
  await invalidtyInformation.selectInsuredPersonEmployment('No');
  await page1.getByLabel('Date of Cessation of').click();
  await calendarPage.selectDateInsuredPersonPage('2022', '12', '30');

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState('200701');
  await preferredSOCSOOfficePage.selectSOCSOOffice('200419');

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel('Account No.*', { exact: true }).selectOption('Yes');
  await bankInformationPage.selectAccountNo('No');

  await page1.getByLabel('Reason*').selectOption('207301');

  await page1.getByLabel('Insolvency Search*').selectOption('Yes');
  await page1.getByLabel('Insolvency State*').selectOption('200701');
  await page1.getByLabel('Insolvency Branch*').selectOption('806005');

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page1);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();
  await confirmationOfInsuredPage.checkCompletedCheckbox();

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

  // Perform other actions as needed
  await page2.getByRole('button', { name: 'Close' }).click();
});
