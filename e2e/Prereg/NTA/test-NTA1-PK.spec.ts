import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base";
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { EmployerInfoPage } from "../../../pages/employer_info";
import { MedicalCertificatePage } from "../../../pages/mc_info";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { CertificationByEmployerPage } from "../../../pages/cert_employer";
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { AccidentInformationPage } from "../../../pages/accident_info";
import { CalendarPage } from "../../../utils/calendar";
import { TimePage } from "../../../utils/time";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";
import { ButtonPage } from "../../../utils/button";
import { readCSV } from "../../../helper/csvHelper";
import { SRNPage } from "../../../pages/srn";
import { expectedResponse } from "../../../mockData/mockData"; // Adjust the path as necessary
import { API_ENDPOINTS } from "../../../endpoint/endpoints"; // Adjust the path as necessary

const fs = require("fs");
const path = require("path");

test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test.only("Prereg PK NTA EFT MC", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  const timePage = new TimePage(page);

  // Read data from CSV
  const csvFilePath = path.resolve(__dirname, "../../../testData/testData.csv"); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data
//test
  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  //When I click on the Preregistration link
  leftTabPage.clickPreregistration();

  // Fill in data from CSV
  await preregPage.selectNoticeTypePreRegOption(data.noticeType);
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe(data.noticeType);

  // click accident date
  await preregPage.clickAccidentDatePrereg();

  const calendar = new CalendarPage(page);
  await calendar.selectAccidentDate(data.accidentYear, data.accidentMonth, data.accidentDay);
  // Add accident time

  await preregPage.clickAccidentTime();
  await timePage.selectTimeOption(data.accidentHour, data.accidentMinute, data.accidentSecond);

  // Fill in identification type and number
  await preregPage.selectIdentificationType(data.identificationType);
  await preregPage.identificationTypeLabel.waitFor();
  await preregPage.identificationTypeLabel.isVisible();
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe(data.identificationType);

  await preregPage.fillIdentificationNo(data.identificationNo);
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data.identificationNo);

  // Fill in employer code
  await preregPage.fillEmployerCode(data.employerCode);
  const filledEmployerCode = await preregPage.getEmployerCode();
  expect(filledEmployerCode).toBe(data.employerCode);

  // Click search button

  await preregPage.helperClick();
  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;

  await page.waitForLoadState("networkidle");

  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  // Mock the API call using the expected response
  await page.route(API_ENDPOINTS.GET_SYSTEM_PARAMETERS, async (route) => {
    await route.fulfill({
      status: 200, // Set the status code
      contentType: "application/json", // Set the content type
      body: JSON.stringify(expectedResponse), // Use the imported expected response
    });
  });

  // Trigger the API call directly from the page context and return the response
  const apiResponse = await page.evaluate(async (endpoint) => {
    const response = await fetch(endpoint); // Use passed endpoint

    // Ensure we wait for the response to be parsed as JSON
    const data = await response.json(); // Parse JSON response

    return { status: response.status, data }; // Return status and data
  }, API_ENDPOINTS.GET_SYSTEM_PARAMETERS); // Pass endpoint as an argument

  // Assert that we received a response
  expect(apiResponse.status).toBe(200); // Assert that the status code is 200

  // Assert that the body matches expected mock data structure
  expect(apiResponse.data).toEqual(expectedResponse); // Use the imported expected response for assertion

  const remarksPage = new RemarksPage(page1);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);

  await insuredPersonInfoPage.insuredPersonInfoButton.waitFor();
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage(data.accidentYear, data.accidentMonth, data.accidentDay);
  //await calendarPage.selectDateInsuredPersonPage(data.accidentYear, data.accidentMonth, data.accidentDay);
  //if done revision will auto pull field
  await insuredPersonInfoPage.fillOccupation("CS");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationality("201749");

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  //add Reference Notice Information

  const accidentInformationPage = new AccidentInformationPage(page1);
  await accidentInformationPage.clickAccidentInformationButton();
  await accidentInformationPage.fillAccidentHappened("test");
  await accidentInformationPage.fillAccidentInjury("test");

  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  //await page1.getByRole("textbox").nth(1).click();
  await calendarPage.mcDate().nth(1).click();
  await calendarPage.selectDateInsuredPersonPage(data.accidentYear, data.accidentMonth, data.accidentDay);

  //await page1.getByRole("textbox").nth(2).click();
  await calendarPage.mcDate().nth(2).click();
  await calendarPage.selectDateMCEndDate(data.MCEndYear, data.MCEndMonth, data.MCEndDay);
  await medicalCertificatePage.submitButton().click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName("MAT");
  await certificationByEmployerPage.fillDesignation("CEO");
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage("2021", "8", "11");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await bankInformationPage.selectAccountNo("Yes");
  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankNameAccident("802121");
  await bankInformationPage.selectBankAccountType("204401");
  await bankInformationPage.fillBankBranch("KL");
  await bankInformationPage.fillBankAccountNo("12345678");

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

  const page2Promise = page1.waitForEvent("popup");
  const page2 = await page2Promise;

  const srnPage = new SRNPage(page2);
  await srnPage.saveSchemeRefValue();

  // Perform other actions as needed
  await page2.getByRole("button", { name: "Close" }).click();
});

test("Prereg PK NTA BankRuptcy MC", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const timePage = new TimePage(page);

  // Read data from CSV
  const csvFilePath = path.resolve(__dirname, "../../../testData/testData.csv"); // Path to CSV file
  const testData = await readCSV(csvFilePath);
  const data = testData[0]; // Use the first row of data

  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("Accident");
  // Verify the selected option text
  const selectedOptionText = await preregPage.SelectedNoticeTypeText;
  expect(selectedOptionText).toBe("Accident"); // Assert the selected text is correct

  // click accident date
  await preregPage.clickAccidentDatePrereg();

  const calendar = new CalendarPage(page);
  await calendar.selectAccidentDate(data.accidentYear, data.accidentMonth, data.accidentDay);

  await preregPage.clickAccidentTime();
  await timePage.selectTimeOption(data.accidentHour, data.accidentMinute, data.accidentSecond);

  // Fill in identification type and number
  await preregPage.selectIdentificationType(data.identificationType);
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe(data.identificationType);

  await preregPage.fillIdentificationNo(data.identificationNo);
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  expect(filledIdentificationNo).toBe(data.identificationNo);

  // Fill in employer code
  await preregPage.fillEmployerCode(data.employerCode);
  const filledEmployerCode = await preregPage.getEmployerCode();
  expect(filledEmployerCode).toBe(data.employerCode);

  await page.frameLocator("#baristaPageOut").locator("#row23column2").click();
  await preregPage.clickSearchButton();

  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;

  await page.waitForLoadState("networkidle");

  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page1);
  remarksPage.clickRemarksButton();
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("2023", "4", "1");
  //if done revision will auto pull field
  await insuredPersonInfoPage.fillOccupation("CS");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await insuredPersonInfoPage.selectNationality("201749");

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  //add Reference Notice Information

  const accidentInformationPage = new AccidentInformationPage(page1);
  await accidentInformationPage.clickAccidentInformationButton();
  await accidentInformationPage.fillAccidentHappened("test");
  await accidentInformationPage.fillAccidentInjury("test");

  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  await page1.getByRole("textbox").nth(1).click();
  await calendarPage.selectDateInsuredPersonPage("2023", "1", "1");

  await page1.getByRole("textbox").nth(2).click();
  await calendarPage.selectDateMCEndDate("2023", "1", "20");
  await medicalCertificatePage.submitButton().click();

  const wagesInfoPage = new WagesInfoPage(page1);
  await wagesInfoPage.clickWagesInfoButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page1);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();
  preferredSOCSOOfficePage.selectSOCSOState("200701");
  await preferredSOCSOOfficePage.selectSOCSOOffice("200419");

  const certificationByEmployerPage = new CertificationByEmployerPage(page1);
  await certificationByEmployerPage.clickCertificationByEmployerButton();
  await certificationByEmployerPage.fillName("MAT");
  await certificationByEmployerPage.fillDesignation("CEO");
  await certificationByEmployerPage.calendar.click();
  await calendarPage.selectDateInsuredPersonPage("2021", "8", "11");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel("Account No.*", { exact: true }).selectOption("Yes");
  await bankInformationPage.selectAccountNo("No");
  await page1.getByLabel("Reason*").selectOption("207301");
  await page1.getByLabel("Insolvency Search").selectOption("1");
  await page1.getByLabel("Insolvency State").selectOption("200701");
  await page1.getByLabel("Insolvency Branch").selectOption("806005");

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

  const page2Promise = page1.waitForEvent("popup");
  const page2 = await page2Promise;

  const srnPage = new SRNPage(page2);
  await srnPage.saveSchemeRefValue();

  // Perform other actions as needed
  await page2.getByRole("button", { name: "Close" }).click();
});
