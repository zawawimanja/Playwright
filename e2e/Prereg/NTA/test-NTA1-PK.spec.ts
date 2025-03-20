import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base';
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
import { ButtonPage } from '../../../utils/button';
import { readCSV } from '../../../helper/csvHelper';
import { SRNPage } from '../../../pages/srn';
import { validateConstants } from '../../../utils/validateConstants';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load constants from JSON file
const constants = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../constants.json'), 'utf-8'),
);

// Validate constants

//test
validateConstants(constants);

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, 'afzan.pks', 'u@T_afzan');
});

export let schemeRefValue: string;

async function getTestData(rowIndex: number) {
  const csvFilePath = path.resolve(__dirname, '../../../testData/testData.csv'); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  return testData[rowIndex];
}

interface TestData {
  noticeType: string;
  accidentYear: string;
  accidentMonth: string;
  accidentDay: string;
  accidentHour: string;
  accidentMinute: string;
  accidentSecond: string;
  identificationType: string;
  identificationNo: string;
  employerCode: string;
  EFT: string;
}

async function runTest(page: import('@playwright/test').Page, data: TestData) {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const timePage = new TimePage(page);

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
  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

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

  // Fill in data from CSV
  await preregPage.selectNoticeTypePreRegOption(data.noticeType);
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe(data.noticeType);

  // click accident date
  await preregPage.clickAccidentDatePrereg();

  const calendar = new CalendarPage(page);
  await calendar.selectAccidentDate(
    data.accidentYear,
    data.accidentMonth,
    data.accidentDay,
  );
  // Add accident time

  await preregPage.clickAccidentTime();
  await timePage.selectTimeOption(
    data.accidentHour,
    data.accidentMinute,
    data.accidentSecond,
  );

  // Fill in identification type and number
  await preregPage.selectIdentificationType(data.identificationType);
  await preregPage.identificationTypeLabel.waitFor();
  await preregPage.identificationTypeLabel.isVisible();
  const selectedIdentificationTypeText =
    await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe(data.identificationType);

  await preregPage.fillIdentificationNo(data.identificationNo);
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data.identificationNo);

  // Fill in employer code
  await preregPage.fillEmployerCode(data.employerCode);
  const filledEmployerCode = await preregPage.getEmployerCode();
  await preregPage.employerCodeInput.click();
  expect(filledEmployerCode).toBe(data.employerCode);

  // Click search button
  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent('popup');
  await page.waitForLoadState('networkidle');
  await preregPage.clickNextButton();
  const page1 = await pagePromise;

  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  await page.waitForLoadState('networkidle');
  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText(constants.remarksText);
  remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill('test');
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);

  await page1.waitForLoadState('networkidle');

  await insuredPersonInfoPage.insuredPersonInfoButton.waitFor({
    state: 'visible',
  });
  await expect(page1.locator('#sectionTabs')).toContainText(
    constants.insuredPersonInfoText,
  );
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();
  await calendarPage.selectDateInsuredPersonPage(
    data.accidentYear,
    data.accidentMonth,
    data.accidentDay,
  );
  await insuredPersonInfoPage.fillOccupation(constants.occupation);
  await insuredPersonInfoPage.fillAddress1(constants.address1);
  await insuredPersonInfoPage.fillAddress(2, constants.address2);
  await insuredPersonInfoPage.fillAddress(3, constants.address3);
  await insuredPersonInfoPage.selectState(constants.state);
  await insuredPersonInfoPage.selectCity(constants.city);
  await insuredPersonInfoPage.fillPostcode(constants.postcode);
  await insuredPersonInfoPage.selectNationality(constants.nationality);

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  // Add Reference Notice Information

  const accidentInformationPage = new AccidentInformationPage(page1);
  await accidentInformationPage.clickAccidentInformationButton();
  await accidentInformationPage.fillAccidentHappened(constants.accidentInjury);
  await accidentInformationPage.fillAccidentInjury(constants.accidentInjury);

  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  // 1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName('kl');

  // await page1.getByRole("textbox").nth(1).click();
  await calendarPage.mcDate().nth(1).click();
  await calendarPage.selectDateInsuredPersonPage('2023', '7', '1');

  // await page1.getByRole("textbox").nth(2).click();
  await calendarPage.mcDate().nth(2).click();
  await calendarPage.selectDateMCEndDate('2023', '7', '15');
  await medicalCertificatePage.submitButton().click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  await preferredSOCSOOfficePage.selectSOCSOState(constants.socsoState);
  await preferredSOCSOOfficePage.selectSOCSOOffice(constants.socsoOffice);

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName(constants.employerName);
  await certificationByEmployerPage.fillDesignation(
    constants.employerDesignation,
  );
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage('2021', '8', '11');

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  if (data.EFT === 'Yes') {
    await bankInformationPage.selectAccountNo(constants.bankAccountYes);
    await bankInformationPage.selectBankLocation(constants.bankLocation);
    await bankInformationPage.selectBankNameAccident(
      constants.bankNameAccident,
    );
    await bankInformationPage.selectBankAccountType(constants.bankAccountType);
    await bankInformationPage.fillBankBranch(constants.bankBranch);
    await bankInformationPage.fillBankAccountNo(constants.bankAccountNo);
  } else {
    await bankInformationPage.selectAccountNo('No');
    await page1.getByLabel(constants.reasonLabel).selectOption('207301');
    await page1.getByLabel('Insolvency Search').selectOption('1');
    await page1.getByLabel('Insolvency State').selectOption('200701');
    await page1.getByLabel('Insolvency Branch').selectOption('806005');
  }

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

  const srnPage = new SRNPage(page2);
  // await srnPage.saveSchemeRefValue();

  // Wait for the element to be present
  await page2.getByLabel(constants.schemeRefNoLabel).waitFor();

  const schemeRefValue = await page2
    .getByLabel(constants.schemeRefNoLabel)
    .inputValue();
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
}

test.only('Prereg PK NTA EFT MC - Test Case 1', async ({ page }) => {
  const data = await getTestData(0); // Use the first row of data
  await runTest(page, data);
});

test('Prereg PK NTA BANKRUPT MC - Test Case 2', async ({ page }) => {
  const data = await getTestData(1); // Use the second row of data
  await runTest(page, data);
});
