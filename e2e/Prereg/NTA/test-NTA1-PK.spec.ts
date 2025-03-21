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
import * as xlsx from 'xlsx';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load constants from JSON file
const constants = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../constants.json'), 'utf-8'),
);

// Validate constants
validateConstants(constants);

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, 'afzan.pks', 'u@T_afzan');
});

export let schemeRefValue: string;

async function getTestData(rowIndex: number) {
  const excelFilePath = path.resolve(__dirname, '../../../testData/testDataSikap.xlsx');
  const fileBuffer = fs.readFileSync(excelFilePath);
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  
  // Modified options to properly read headers
  const jsonData = xlsx.utils.sheet_to_json(sheet, { 
    raw: true,
    defval: null,
    blankrows: false,
    header: 1
  });

  // Get headers from second row (index 1)
  const headers = jsonData[1];
  // Get actual data row (add 3 to skip header rows and get actual data)
  const rowData = jsonData[rowIndex + 3];
  
  // Create object with proper headers and ensure string values
  const data = {};
  headers.forEach((header, index) => {
    if (header) {
      const value = rowData ? rowData[index] : null;
      // Handle different data types
      if (header.includes('Date') && typeof value === 'number') {
        // Convert Excel date number to JavaScript Date
        const date = new Date((value - 25569) * 86400 * 1000);
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const year = date.getFullYear();
        data[header.trim()] = `${month}/${day}/${year}`;
      } else if (header === 'Accident Time' && typeof value === 'number') {
        // Convert Excel time decimal to HH:mm:ss format
        const totalSeconds = Math.round(value * 86400); // Convert to seconds
        let hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Handle 12-hour format (Excel uses 24-hour format)
        if (hours >= 24) {
            hours = hours % 24;
        }
        
        // Convert to 12-hour format
        const period = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // Convert 0 to 12
        
        // Format as hh:mm:ss AM/PM
        data[header.trim()] = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${period}`;
      } else {
        // Handle other values
        data[header.trim()] = value !== null ? String(value) : null;
      }
    }
  });

  // Debug logging
  console.log('Headers:', headers);
  console.log('Actual Row Data:', rowData);
  console.log('Mapped Data:', data);

  return data;
}

async function runTest(page: import('@playwright/test').Page, data: any) {
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

  // Fill in data from Excel
  await preregPage.selectNoticeTypePreRegOption("Accident");
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe("Accident");

  // click accident date
  await preregPage.clickAccidentDatePrereg();

const calendar = new CalendarPage(page);

// Log the data object to verify its contents
console.log('Data:', data);
console.log('Data keys:', Object.keys(data));

// Read and parse Accident Date from Excel data
if (data["Accident Date"]) {
  const [month, day, year] = data["Accident Date"].split('/').map(String); // Convert to strings
  await calendar.selectAccidentDate(year, month, day);
} else {
  throw new Error('Accident Date is undefined');
}

// Read and parse Accident Time from Excel data
if (data["Accident Time"]) {
  const [timeStr, period] = data["Accident Time"].split(' ');
  const [hours, minutes, seconds] = timeStr.split(':').map(Number);
  
  // Convert to 24-hour if PM
  let hour24 = hours;
  if (period === 'PM' && hours !== 12) {
    hour24 = hours + 12;
  } else if (period === 'AM' && hours === 12) {
    hour24 = 0;
  }

  await preregPage.clickAccidentTime();
  await timePage.selectTimeOption(hour24, minutes, seconds);
} else {
  throw new Error('Accident Time is undefined');
}

// Fill in identification type and number
await preregPage.selectIdentificationType("New IC");
await preregPage.identificationTypeLabel.waitFor();
await preregPage.identificationTypeLabel.isVisible();
const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
expect(selectedIdentificationTypeText).toBe("New IC");

await preregPage.fillIdentificationNo(data["IC No."]);
const filledIdentificationNo = await preregPage.getIdentificationNo();
expect(filledIdentificationNo).toBe(data["IC No."]);

// Fill in employer code
await preregPage.fillEmployerCode(data["Employer Code"]);
const filledEmployerCode = await preregPage.getEmployerCode();
await preregPage.employerCodeInput.click();
expect(filledEmployerCode).toBe(data["Employer Code"]);

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
