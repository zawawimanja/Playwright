import { test, expect } from '@playwright/test';
import { login } from '../../../utils/base'; // Import from base.ts
import { PreregistrationPage } from '../../../pages/prereg';
import { LeftTabPage } from '../../../pages/left_tab';
import { DraftPage } from '../../../pages/draft';
import { RemarksPage } from '../../../pages/remarks';
import { PreviewSubmissionPage } from '../../../pages/preview_submission';
import { OccupationalDiseasePage } from '../../../pages/od_info';
import { EmployerInfoPage } from '../../../pages/employer_info';
import { MedicalCertificatePage } from '../../../pages/mc_info';
import { WagesInfoPage } from '../../../pages/wages_info';
import { InsuredPersonInfoPage } from '../../../pages/insured_person_info';
import { PreferredSOCSOOfficePage } from '../../../pages/socso_office';
import { CertificationByEmployerPage } from '../../../pages/cert_employer';
import { BankInformationPage } from '../../../pages/bank_info';
import { SupportingDocumentPage } from '../../../pages/support_doc';
import { ConfirmationOfInsuredPage } from '../../../pages/confirm_person';
import { CalendarPage } from '../../../utils/calendar';
import { SubmitPage } from '../../../pages/submit';
import { CasesPage } from '../../../pages/cases';
import { ButtonPage } from '../../../utils/button';
import { readCSV } from '../../../helper/csvHelper'; // Import the CSV helper
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import * as xlsx from 'xlsx';
import { validateConstants } from '../../../utils/validateConstants';
import { cityMappings } from '../../../mappings/cityMappings';
import { countryBankMappings } from '../../../mappings/countryBankMappings';
import { stateMappings } from '../../../mappings/stateMappings';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load constants from JSON file
const constants = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '../../../constants.json'), 'utf-8'),
);

// Validate constants
validateConstants(constants);

export let schemeRefValue: string;

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, 'uat_selamat', 'u@T_selamat');
});



async function getTestData(rowIndex: number) {
  const excelFilePath = path.resolve(__dirname, '../../../testData/NTO.xlsx');
  const fileBuffer = fs.readFileSync(excelFilePath);
  const workbook = xlsx.read(fileBuffer, { type: 'buffer' });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Modified options to properly read headers
  const jsonData: unknown[][] = xlsx.utils.sheet_to_json(sheet, {
    raw: true,
    defval: null,
    blankrows: false,
    header: 1
  });

  // Get headers from second row (index 1)
  const headers: string[] = jsonData[1] as string[];
  // Get actual data row (add 3 to skip header rows and get actual data)
  const rowData: (string | number | null)[] = jsonData[rowIndex + 2] as (string | number | null)[];


  // Create object with proper headers and ensure string values
  const data: { [key: string]: string | null } = {};
  headers.forEach((header: string, index: number) => {
    if (header) {
      const value = rowData ? rowData[index] : null;

      switch (header.trim()) {
        // Date fields
        case 'Notice Date':
        case 'First Date of MC':
        case 'Last Date of MC':
        case 'Date of MB':
        case 'Certification By Employer - Date':
          if (typeof value === 'number') {
            console.log("Converting date (number):", value);
            const date = new Date((value - 25569) * 86400 * 1000);
            data[header.trim()] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
          } else if (typeof value === 'string') {
            console.log("Date is a string:", value); // ADD THIS LINE
            data[header.trim()] = value; // Assuming the date string is already in the correct format
          }
          break;

        case 'City':
          console.log('\n=== City Data Processing ===');
          console.log('Raw value:', value);
          console.log('Header:', header);
          console.log('Index:', headers.indexOf('City'));
          data[header.trim()] = value ? String(value).trim() : null;
          console.log('Processed value:', data[header.trim()]);
          break;

        // Number fields that need string conversion with padding
        case 'IC No. OB':
          data[header.trim()] = value ? String(value).padStart(12, '0') : null;
          break;
        case 'Mobile No':
          data[header.trim()] = value ? String(value).padStart(10, '0') : null;
          break;

        // Code fields
        case 'Employer Code':
        case 'Employer Code Old':
        case 'Bank Code':
        case 'Other Code Value':
          data[header.trim()] = value ? String(value) : null;
          break;

        // Numeric fields
        case 'Est Salary 1':
        case 'Est Salary 2':
        case 'Est Salary 3':
        case 'Est Salary 4':
        case 'Est Salary 5':
        case 'Est Salary 6':
        case 'Peratus Taksiran (%)':
          data[header.trim()] = value ? String(Number(value)) : '0';
          break;

        // Text fields
        case 'Occupation':
        case 'Sub-Occupation':
        case 'Address 1':
        case 'Address 2':
        case 'Address 3':
        case 'Postcode':
        case 'State':
        case 'Email Address':
        case 'Place of Accident':
        case 'Bank Name':
        case 'Bank Branch*':
        case 'Bank Account No':
        case 'Bank Account Type':
        case  'Bank Swift Code':
        case 'Bank Address':
        case 'Is Malaysia Citizen?*':
          data[header.trim()] = value ? String(value) : null;
          break;

        // Boolean fields
        case 'Is Accident Date a Working Day':
          data[header.trim()] = value ? String(value).toUpperCase() : 'NO';
          break;

        // Fields that need specific validation
        case 'Assessment Type':
        case 'Payment Option':
          data[header.trim()] = value ? String(value).trim() : null;
          break;

        // SOCSO Office fields - handle numeric codes
        case 'Preferred SOCSO OfficeState*':
        case 'Preferred SOCSO SOCSO Office*':
          data[header.trim()] = value ? String(value) : null;
          break;

        // Bank related fields
        case 'Bank Account No.':  // Changed to match Excel header exactly
          // Use raw value directly without additional processing
          data[header.trim()] = rowData[headers.indexOf('Bank Account No.')] ?
            String(rowData[headers.indexOf('Bank Account No.')]) : null;
          break;

          case 'Bank Account No./IBAN No.*':  // Changed to match Excel header exactly
          // Use raw value directly without additional processing
          data[header.trim()] = rowData[headers.indexOf('Bank Account No./IBAN No.*')] ?
            String(rowData[headers.indexOf('Bank Account No./IBAN No.*')]) : null;
          break;

        // Default case for any other fields
        default:
          data[header.trim()] = value !== null ? String(value) : null;
      }
    }
  });

  // Debug logging to verify data conversion
  console.log('=== Data Processing ===');
  console.log('Headers Processed:', headers.filter(h => h && h.trim() !== '').length);
  console.log('Sample Data:', {
    'IC No': data['IC No. OB'],
    'Employer Code': data['Employer Code'],
    'Accident Date': data['Accident Date'],
    'Est Salary 1': data['Est Salary 1']
  });

  // Add this after data mapping in getTestData function
  console.log('=== Mapped Data ===');
  console.log('Headers with Values:');
  Object.entries(data).forEach(([header, value]) => {
    // Only log if value is not null, undefined, or empty string
    if (value !== null && value !== undefined && value !== '') {
      console.log(`${header}: ${value}`);
    }
  });

  // Group data by types for better readability
  console.log('\n=== Data by Type ===');
  const logGroupedData = (group: string, fields: { [key: string]: string | null }) => {
    const validData = Object.entries(fields)
      .filter(([_, value]) => value !== null && value !== undefined && value !== '')
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});

    if (Object.keys(validData).length > 0) {
      console.log(group + ':', validData);
    }
  };

  logGroupedData('Dates', {
    'Accident Date': data['Accident Date'],
    'Notice Date': data['Notice Date'],
    'First Date of MC': data['First Date of MC'],
    'Last Date of MC': data['Last Date of MC']
  });

  logGroupedData('Personal Info', {
    'IC No': data['IC No. OB'],
    'Mobile No': data['Mobile No'],
    'Occupation': data['Occupation']
  });

  console.log('Address Info:', {
    'Address 1': data['Address 1'],
    'Address 2': data['Address 2'],
    'Address 3': data['Address 3'],
    'Postcode': data['Postcode'],
    'City': data['City'],
    'State': data['State']
  });

  console.log('Bank Info:', {
    'Bank Name': data['Bank Name'],
    'Bank Account No': data['Bank Account No.'],  // Added period
    'Bank Branch*': data['Bank Branch*'],
    'Bank Account Type': data['Bank Account Type']
  });

  // Modify the logging to show what's actually in the data object
  console.log('=== Raw Data Check ===');
  console.log('City value:', rowData[headers.indexOf('City')]);
  console.log('State value:', rowData[headers.indexOf('State')]);
  console.log('Bank Account No value:', rowData[headers.indexOf('Bank Account No.')]);

  // Add debug logging specifically for Bank Account No
  console.log('=== Bank Account Debug ===');
  console.log('Raw index:', headers.indexOf('Bank Account No.'));
  console.log('Raw value:', rowData[headers.indexOf('Bank Account No.')]);
  console.log('Processed value:', data['Bank Account No.']);

  // Add debug logging for City processing
  console.log('=== City Processing Debug ===');
  console.log('Raw City value:', rowData[headers.indexOf('City')]);
  console.log('Processed City value:', data['City']);

  // Add verification after processing
  console.log('\n=== City Data Verification ===');
  console.log('Final City value:', data['City']);
  console.log('City in data object:', Object.keys(data).includes('City'));



  return data;
}





async function runTest(page: import('@playwright/test').Page, data: any) {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  await page.waitForTimeout(5000);
  await page.waitForLoadState('networkidle');
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#formPreview'),
  ).toBeVisible();

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('heading', { name: 'Home Page' }),
  ).toBeVisible();
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#previewPanel'),
  ).toContainText('Home Page');
  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('img', { name: 'Socso Logo is missing.' }),
  ).toBeVisible();

  await page.waitForTimeout(5000);
  // await leftTabPage.leftBar.waitFor();
  // await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  // When click on the PreRegisteration tab
  //leftTabPage.clickPreregistration();
  await page.locator('#sidebarMenu div').filter({ hasText: 'Pre-Registration' }).first().click();
  await page.waitForLoadState('networkidle');

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('heading', { name: 'Pre-Registration' }),
  ).toBeVisible();
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('h2'),
  ).toContainText('Pre-Registration');

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .getByRole('heading', { name: 'Search Insured Person &' }),
  ).toBeVisible();
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#Heading31'),
  ).toContainText('Search Insured Person & Employer Registration Status');

  await expect(
    page
      .locator('#baristaPageOut')
      .contentFrame()
      .locator('#ctrlField596')
      .getByText('Notice Type'),
  ).toBeVisible();
  await expect(
    page.locator('#baristaPageOut').contentFrame().locator('#ctrlField596'),
  ).toContainText('Notice Type');

  const options = await preregPage.noticeTypePreRegSelect
    .locator('option')
    .allTextContents();

  expect(options.length).toBe(5);
  expect(options).toEqual([
    'Accident',
    'Death - PKT',
    'Death - FOT',
    'OD',
    'ILAT',
  ]);
  await page.waitForTimeout(5000);
  await preregPage.selectNoticeTypePreRegOption('OD');

  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe('OD');

  await preregPage.selectInsuredPersonEmployment('Yes');
  const selectedEmploymentText =
    await preregPage.getSelectedInsuredPersonEmploymentText();
  expect(selectedEmploymentText).toBe('Yes');
  // The selected option text remaining as 'Yes'

  // Fill in identification type and numbers
  await preregPage.selectIdentificationType("New IC");
  const selectedIdentificationTypeText =
    await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  // Verify the selected option text
  await preregPage.selectNoticeAndBenefitClaimFormOption('Insured Person');
  await expect(preregPage.noticeAndBenefitClaimFormSelect).toHaveValue(
    'Insured Person',
  );
  await expect(preregPage.noticeAndBenefitClaimFormSelect).toContainText(
    'Insured Person',
  );

  // Select any option from the dropdown list, e.g, "New ID"
  await preregPage.fillIdentificationNo(data["IC No. OB"]);
  
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  // expect(filledIdentificationNo).toBe(data["IC No."]);

  // Fill in employer code with validation
  if (data["Employer Code"]) {
    await preregPage.fillEmployerCode(data["Employer Code"]);
    const filledEmployerCode = await preregPage.getEmployerCode();
    await preregPage.employerCodeInput.click();
    expect(filledEmployerCode).toBe(data["Employer Code"]);
  } else {
    throw new Error('Employer Code is undefined');
  }


  // Click the "Submit" button to proceed to
  await preregPage.clickClaimFormSubmissionByListButton();
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

  await page.screenshot({ path: 'debug_screenshot.png' });

  const remarksPage = new RemarksPage(page1);

  await remarksPage.remarksButton.waitFor({ state: 'visible' });
  await remarksPage.clickRemarksButton();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText('Remarks');

  await remarksPage.addRemarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill('test');
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  await page1.waitForTimeout(5000);
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();
  console.log("Notice Date from Excel:", data["Notice Date"]); // ADD THIS LINE


  if (data["Notice Date"]) {
    const [month, day, year] = data["Notice Date"].split('/').map(String); // Convert to strings
    await calendarPage.selectDateInsuredPersonPage(year, day, month);
  } else {
    throw new Error('Notice Date is undefined');
  }

  await page1.getByLabel('Gender*').selectOption('200601');
  await expect(page1.getByLabel('Gender*')).toHaveValue('200601');

  await insuredPersonInfoPage.fillOccupation('CS');
  

  await insuredPersonInfoPage.selectOccupation('1000002');
  await insuredPersonInfoPage.selectSubOccupation('1001132');
  await insuredPersonInfoPage.selectSubOccupationalList('1002058');

  await insuredPersonInfoPage.fillAddress1(data["Address 1"]);
  
  await insuredPersonInfoPage.fillAddress(2, data["Address 2"].toString());
   
  if (data["State"]) {

    const stateName = data["State"].trim().toUpperCase();
    console.log('Looking up:', stateName);
    console.log('Found in mappings:', stateMappings[stateName]);

    const stateCode = stateMappings[stateName];
    if (stateCode) {

      await insuredPersonInfoPage.selectState(stateCode);
    } else {
      console.log('State not found in mappings:', stateName);
      console.log('Falling back to default code 201059');
      await insuredPersonInfoPage.selectState("201059");
    }
  }
  
 if (data["City"]) {

      const cityName = data["City"].trim().toUpperCase();
      console.log('Looking up:', cityName);
      console.log('Found in mappings:', cityMappings[cityName]);
  
      const cityCode = cityMappings[cityName];
      if (cityCode) {
        console.log('Using city code:', cityCode);
        await insuredPersonInfoPage.selectCity(cityCode);
      } else {
        console.log('City not found in mappings:', cityName);
        console.log('Falling back to default code 201059');
        await insuredPersonInfoPage.selectCity("201059");
      }
    }
  

  await insuredPersonInfoPage.fillPostcode(data["Postcode"]);
 

  await insuredPersonInfoPage.selectNationality('201749');
  await expect(insuredPersonInfoPage.NationalitySelect).toHaveValue('201749');

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page1);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();
  await occupationalDiseasePage.fillDescriptionOfOccupational(data["Description of Occupational Disease"]);

  await occupationalDiseasePage.selectDiseaseRelatedEMploymentOption('Yes');

  await occupationalDiseasePage.fillSpecifyDutiesAndHow(data["Description of Occupational Disease"]);
  await occupationalDiseasePage.fillPleaseExplainSymptoms(data["Description of Occupational Disease"]);
  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName('HKL');

  if (data["First Date of MC"] && data["Last Date of MC"]) {
    await calendarPage.mcDate().nth(1).click();
    const [mcStartMonth, mcStartDay, mcStartYear] = data["First Date of MC"].split('/');
    await calendarPage.selectDateInsuredPersonPage(mcStartYear, mcStartMonth, mcStartDay);

    await calendarPage.mcDate().nth(2).click();
    const [mcEndMonth, mcEndDay, mcEndYear] = data["Last Date of MC"].split('/');
    await calendarPage.selectDateMCEndDate(mcEndYear, mcEndMonth, mcEndDay);
  }

  await medicalCertificatePage.submitButton().click();


  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  await preferredSOCSOOfficePage.selectSOCSOState('200710');
  await preferredSOCSOOfficePage.selectSOCSOOffice('200402');

  
  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName('Siti binti Saidin');
  await certificationByEmployerPage.fillDesignation('HR');
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage('2023', '3', '8');

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();
  await page1.waitForTimeout(5000);
  await page1.waitForLoadState('networkidle');
  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  // await bankInformationPage.accountNoSelect.click();


    if (data["Bank Location"] === "Local") {
      await bankInformationPage.selectAccountNo("Yes");
      await bankInformationPage.selectBankLocation('204101');
      if (data["Bank Name"]) {
        await bankInformationPage.selectBankName(data["Bank Name"]);
      }
      if (data["Bank Account Type"]) {
        await bankInformationPage.selectBankAccountType(data["Bank Account Type"]);
      }
      if (data["Bank Branch*"]) {
        await bankInformationPage.fillBankBranch(data["Bank Branch*"]);
      }
      if (data["Bank Account No."]) {
        await bankInformationPage.fillBankAccountNo(data["Bank Account No."]);
      }

    } else if (data["Bank Location"] === "Overseas") {
      await page1.getByLabel('Account No.*', { exact: true }).selectOption('1');
  
  
      await page1.getByLabel('Bank Location*').selectOption('204102');
  
      // await page1.getByRole('textbox', { name: 'Bank Name*' }).fill('Bank Rakyat Indonesia');
      await page1.getByRole('textbox', { name: 'Bank Name*' }).fill(data["Bank Name"]);
  
      // await page1.getByRole('textbox', { name: 'Bank Account No./IBAN No.*' }).fill('1412535254');
      await page1.getByRole('textbox', { name: 'Bank Account No./IBAN No.*' }).fill(data["Bank Account No."]);
  
      const country = data["Country"].trim().toUpperCase();
      console.log('Looking up:', country);
      console.log('Found in mappings:', countryBankMappings[country]);
  
  
  
            // await page1.getByLabel('Country*', { exact: true }).selectOption('2126099');
      const countryCode = countryBankMappings[country];
      if (countryCode) {
        console.log('Using country code:', countryCode);
        await page1.getByLabel('Country*', { exact: true }).selectOption(countryCode);
      } else {
        console.log('Country not found in mappings:', country);
        console.log('Falling back to default code 201059');
  
        await page1.getByLabel('Country*', { exact: true }).selectOption('2126099');
      } 
  
      await page1.getByLabel('Is Malaysia Citizen?*').selectOption('Yes');
  
      // await page1.getByRole('textbox', { name: 'Bank Swift Code*' }).fill('BRINIDJAXXX');
      await page1.getByRole('textbox', { name: 'Bank Swift Code*' }).fill(data["Bank Swift Code"]);
  
      // await page1.getByRole('textbox', { name: 'Bank Address*' }).fill('BRI I BUILDING, JALAN JENDERAL SUDIRMAN 44-46');
      await page1.getByRole('textbox', { name: 'Bank Address*' }).fill(data["Bank Adress"]);
  
      ///need to adjust since it same city and state for bank
      await page1.getByRole('textbox', { name: 'State' }).fill(data["Bank State"]);
      
      await page1.getByRole('textbox', { name: 'City' }).fill(data["Bank City"]);
  
     
  } else {
    await bankInformationPage.selectAccountNo('No');
    await page1.getByLabel('Reason*').selectOption('207301');
    await page1.getByLabel('Insolvency Search*').selectOption('Yes');
    await page1.getByLabel('Insolvency State*').selectOption('200701');
    await page1.getByLabel('Insolvency Branch*').selectOption('806005');
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
  await page1.waitForLoadState('networkidle');
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
}


test.only('Prereg PK NTO EFT MC - Test Case 1', async ({ page }) => {
  const data = await getTestData(7); // Use the first row of data
  await runTest(page, data);
});
