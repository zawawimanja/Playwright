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
import { cityMappings } from '../../../mappings/cityMappings';
import { countryBankMappings } from '../../../mappings/countryBankMappings';

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
 // await login(page, 'uat_selamat', 'u@T_selamat');
  await login(page, 'afzan.pks', 'u@T_afzan');
});

export let schemeRefValue: string;

async function getTestData(rowIndex: number) {
  const excelFilePath = path.resolve(__dirname, '../../../testData/NTA.xlsx');
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
        case 'Accident Date':
        case 'Notice Date':
        case 'First Date of MC':
        case 'Last Date of MC':
        case 'Date of MB':
        case 'Certification By Employer - Date':
          if (typeof value === 'number') {
            const date = new Date((value - 25569) * 86400 * 1000);
            data[header.trim()] = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
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
        case 'Address1':
        case 'Address2':
        case 'Address3':
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
    'Address1': data['Address1'],
    'Address2': data['Address2'],
    'Address3': data['Address3'],
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

  // Fill in data from Excel
  await preregPage.selectNoticeTypePreRegOption("Accident");
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe("Accident");

  // click accident date
  await preregPage.clickAccidentDatePrereg();

  const calendar = new CalendarPage(page);

  // Read and parse Accident Date from Excel data
  if (data["Accident Date"]) {
    const [month, day, year] = data["Accident Date"].split('/').map(String); // Convert to strings
    await calendar.selectAccidentDate(year, month, day);
  } else {
    throw new Error('Accident Date is undefined');
  }

  await preregPage.clickAccidentTime();

  await timePage.selectTimeOption(
    "17", "00", "00"
  );


  // Fill in identification type and number
  await preregPage.selectIdentificationType("New IC");
  await preregPage.identificationTypeLabel.waitFor();
  await preregPage.identificationTypeLabel.isVisible();
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.fillIdentificationNo(data["IC No. OB"]);
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data["IC No. OB"]);

  // Fill in employer code with validation
  if (data["Employer Code"]) {
    await preregPage.fillEmployerCode(data["Employer Code"]);
    const filledEmployerCode = await preregPage.getEmployerCode();
    await preregPage.employerCodeInput.click();
    expect(filledEmployerCode).toBe(data["Employer Code"]);
  } else {
    throw new Error('Employer Code is undefined');
  }

  // Click search button
  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent('popup');
  await page.waitForLoadState('networkidle');

  await preregPage.clickNewClaimButton();
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
  await expect(remarksPage.sectionTabs).toContainText(constants.remarks);
  remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill(constants.remarksText);
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

  await page1.waitForTimeout(5000);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();


  if (data["Notice Date"]) {
    const [month, day, year] = data["Notice Date"].split('/').map(String); // Convert to strings
    await calendarPage.selectDateInsuredPersonPage(year, month, day);
  } else {
    throw new Error('Accident Date is undefined');
  }


  // Use Excel data instead of constants
  //occupation based 34
  if (data["Occupation(Based on Form 34)"]) {
    await insuredPersonInfoPage.fillOccupation(data["Occupation(Based on Form 34)"]);
  }
  //occupation

  await page1.getByLabel('Occupation', { exact: true }).selectOption('1000013');
  //sub occupation

  await page1.getByLabel('Sub-Occupation', { exact: true }).selectOption('1001239');
  //suboccupation list

  await page1.getByLabel('Sub-Occupation List').selectOption('1004526');

  if (data["Address1"]) {
    await insuredPersonInfoPage.fillAddress1(data["Address1"]);
  }
  if (data["Address2"]) {
    await insuredPersonInfoPage.fillAddress(2, data["Address2"]);
  }
  if (data["Address3"]) {
    await insuredPersonInfoPage.fillAddress(3, data["Address3"]);
  }
  if (data["State"]) {
    await insuredPersonInfoPage.selectState(data["State"]);
  } else {
    //johor -710
    await insuredPersonInfoPage.selectState("200710");

  }
  // In the runTest function, modify the city selection section
  if (data["City"]) {
    console.log('\n=== City Selection Debug ===');
    console.log('Raw City from data:', data["City"]);
    console.log('City exists in mappings:', data["City"].trim().toUpperCase() in cityMappings);
    console.log('Available city keys:', Object.keys(cityMappings));

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
  } else {
    console.log('\n=== Missing City Data ===');
    console.log('Data object keys:', Object.keys(data));
    console.log('City value:', data["City"]);
    console.log('Raw data:', data);
  }
  if (data["Postcode"]) {
    await insuredPersonInfoPage.fillPostcode(data["Postcode"]);
  }
  await insuredPersonInfoPage.selectNationality('201749');
  await page1.getByRole('textbox', { name: 'Email Address' }).fill('uat@barista.com');
  await page1.getByRole('textbox', { name: 'Mobile No.' }).fill('019-23455433');

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  // Handle Accident Information
  const accidentInformationPage = new AccidentInformationPage(page1);
  await accidentInformationPage.clickAccidentInformationButton();
  await page1.getByLabel('Place of Accident').selectOption('10002');


  await page1.getByLabel('When did the Accident').selectOption('10106');
  if (data["How did the Accident Happened?"]) {
    await accidentInformationPage.fillAccidentHappened(data["How did the Accident Happened?"]);
  }
  if (data["How did the Accident Happened?"]) {
    await accidentInformationPage.fillAccidentInjury(data["How did the Accident Happened?"]);
  }

  //mode transport
  await accidentInformationPage.selectModeOfTransport('10301');
  //cause accident
  await accidentInformationPage.selectCauseofAccident('10602');

  await page1.getByLabel('Is Accident Date a Working').selectOption('1');


  // Handle Medical Certificate
  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  if (data["Name and Address of Clinic/Hospital"]) {
    await medicalCertificatePage.addRecord();
    await medicalCertificatePage.enterClinicHospitalName(data["Name and Address of Clinic/Hospital"]);
  }

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
  

  await page1.getByLabel('Is Wages Paid on the Day of').selectOption('Yes');


  await page1.getByRole('button', { name: 'Preferred SOCSO Office' }).click();
  //selangor
  // await page1.getByLabel('State*').selectOption('200710');
  // await page1.getByLabel('SOCSO Office*').selectOption('200402');

await page1.getByLabel('State*').selectOption('200701');
await page1.getByLabel('SOCSO Office*').selectOption('200419');

  // Update certification section to use Excel data
  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  if (data["Certification By Employer - Name"]) {
    await certificationByEmployerPage.fillName(data["Certification By Employer - Name"]);
  } else {
    await certificationByEmployerPage.fillName(constants.employerName);
  }
  if (data["Certification By Employer - Designation"]) {
    await certificationByEmployerPage.fillDesignation(data["Certification By Employer - Designation"]);
  } else {
    await certificationByEmployerPage.fillDesignation(constants.employerDesignation);
  }

  if (data["Certification By Employer - Date"]) {
    const [month, day, year] = data["Certification By Employer - Date"].split('/').map(String); // Convert to strings
    await certificationByEmployerPage.calendar.click();
    await calendarPage.selectDateInsuredPersonPage(year, month, day);
  }

  // Update bank information section to use Excel data
  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  if (data["Bank Location"] === "Local") {
    await bankInformationPage.selectAccountNo("Yes");
    await bankInformationPage.selectBankLocation("Local");
    if (data["Bank Name"]) {
      await bankInformationPage.selectBankNameAccident(data["Bank Name"]);
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

  
  
  }else {
    // Keep existing bankruptcy flow since it's a special case
    await bankInformationPage.selectAccountNo('No');
    await page1.getByLabel(constants.reasonLabel).selectOption('207301');
    await page1.getByLabel('Insolvency Search').selectOption('1');
    await page1.getByLabel('Insolvency State').selectOption('200701');
    await page1.getByLabel('Insolvency Branch').selectOption('806005');

    // Residing Overseas
    await page1.getByLabel('Reason*').selectOption('207302'); 
    // Permanent Representative
    await page1.getByLabel('Reason*').selectOption('207303'); 

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
