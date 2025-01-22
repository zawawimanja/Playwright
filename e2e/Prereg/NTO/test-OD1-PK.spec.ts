import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { OccupationalDiseasePage } from "../../../pages/od_info";
import { EmployerInfoPage } from "../../../pages/employer_info";
import { MedicalCertificatePage } from "../../../pages/mc_info";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { CertificationByEmployerPage } from "../../../pages/cert_employer";
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { CalendarPage } from "../../../utils/calendar";
import { SubmitPage } from "../../../pages/submit";
import { CasesPage } from "../../../pages/cases";
import { ButtonPage } from "../../../utils/button";
const fs = require("fs");
const path = require("path");
test.beforeEach(async ({ page }) => {
  await login(page, "afzan.pks", "u@T_afzan");
});

export let schemeRefValue: string;

test("Prereg PK OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.preregistrationLink).toBeVisible();
  leftTabPage.clickPreregistration();

  await preregPage.selectNoticeTypePreRegOption("OD");
  // Verify the selected option text
  const selectedOptionText = await preregPage.getSelectedNoticeTypeText();
  expect(selectedOptionText).toBe("OD"); // Assert the selected text is correct

  await preregPage.selectInsuredPersonEmployment("Yes");
  const selectedEmploymentText = await preregPage.getSelectedInsuredPersonEmploymentText();
  expect(selectedEmploymentText).toBe("Yes");

  await preregPage.selectIdentificationType("2");
  const selectedIdentificationTypeText = await preregPage.getSelectedIdentificationTypeText();
  expect(selectedIdentificationTypeText).toBe("New IC");

  await preregPage.selectNoticeAndBenefitClaimFormOption("Insured Person");
  const NoticeAndBenefitClaimFormOptionText = await preregPage.getselectNoticeAndBenefitClaimFormText();
  expect(NoticeAndBenefitClaimFormOptionText).toBe("Insured Person");

  await preregPage.fillIdentificationNo("881207115589");
  const filledIdentificationNo = await preregPage.getIdentificationNo();
  //expect(filledIdentificationNo).toBe("910227016078");

  await preregPage.fillEmployerCode("E1100005399Z");
  const filledEmployerCode = await preregPage.getEmployerCode();
  //expect(filledEmployerCode).toBe("A3700059551B");

  await preregPage.clickClaimFormSubmissionByListButton();
  await preregPage.clickSearchButton();
  const pagePromise = page.waitForEvent("popup");
  await preregPage.clickNextButton();
  const page1 = await pagePromise;

  const draftPage = new DraftPage(page1);

  if (await draftPage.closeButton.isVisible()) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  await page.waitForLoadState("networkidle");

  await page.screenshot({ path: "debug_screenshot.png" });

  const remarksPage = new RemarksPage(page1);

  await remarksPage.remarksButton.waitFor({ state: "visible" });
  await remarksPage.clickRemarksButton();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");

  await remarksPage.addRemarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page1);
  const calendarPage = new CalendarPage(page1);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();
  await insuredPersonInfoPage.noticeAndBenefitClaimFormReceivedDateInput.click();

  await calendarPage.selectDateInsuredPersonPage("2020", "1", "29");

  await insuredPersonInfoPage.fillOccupation("CS");
  await expect(insuredPersonInfoPage.occupationInput).toHaveValue("CS");
  await insuredPersonInfoPage.selectOccupation("1000002");
  await insuredPersonInfoPage.selectSubOccupation("1001132");
  await insuredPersonInfoPage.selectSubOccupationalList("1002058");

  await insuredPersonInfoPage.fillAddress1("Taman");
  await expect(insuredPersonInfoPage.AddressInputFirst).toHaveValue("Taman");
  await insuredPersonInfoPage.fillAddress(2, "Lorong 10");
  await insuredPersonInfoPage.fillAddress(3, "Jalan 1");
  await insuredPersonInfoPage.selectState("200714");
  await expect(insuredPersonInfoPage.occupationInput).toHaveValue("200714");
  await insuredPersonInfoPage.selectCity("201460");
  await expect(insuredPersonInfoPage.occupationInput).toHaveValue("201460");
  await insuredPersonInfoPage.fillPostcode("51000");
  await expect(insuredPersonInfoPage.occupationInput).toHaveValue("51000");
  await insuredPersonInfoPage.selectNationality("201749");
  await expect(insuredPersonInfoPage.occupationInput).toHaveValue("201749");

  const employerInfoPage = new EmployerInfoPage(page1);
  await employerInfoPage.clickEmployerInfoButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page1);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();
  await occupationalDiseasePage.fillDescriptionOfOccupational("test");

  await occupationalDiseasePage.selectDiseaseRelatedEMploymentOption("Yes");

  await occupationalDiseasePage.fillSpecifyDutiesAndHow("test");
  await occupationalDiseasePage.fillPleaseExplainSymptoms("test");
  const medicalCertificatePage = new MedicalCertificatePage(page1);
  await medicalCertificatePage.clickMedicalCertificateButton();

  //1st mc
  await medicalCertificatePage.addRecord();
  await medicalCertificatePage.enterClinicHospitalName("kl");

  await page1.getByRole("textbox").nth(1).click();
  await calendarPage.selectDateInsuredPersonPage("2020", "1", "30");

  await page1.getByRole("textbox").nth(2).click();
  await calendarPage.selectDateMCEndDate("2020", "2", "13");
  await medicalCertificatePage.submitButton().click();

  //2nd mc
  // await medicalCertificatePage.addRecord();
  // await medicalCertificatePage.enterClinicHospitalName("kl");

  // await calendarPage.startDateInput.click();

  // await calendarPage.selectDateInsuredPersonPage("2021", "7", "9");

  // await calendarPage.endDateInput.click();

  // await calendarPage.selectDateMCEndDate("2021", "7", "14");
  // await medicalCertificatePage.submitButton().click();

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
  await calendarPage.selectDateInsuredPersonPage("1991", "8", "11");

  const bankInformationPage = new BankInformationPage(page1);
  await bankInformationPage.clickBankInformationButton();

  await bankInformationPage.accountNoSelect.waitFor();
  await expect(bankInformationPage.accountNoSelect).toBeVisible();
  await bankInformationPage.accountNoSelect.click();

  await page1.getByLabel("Account No.*", { exact: true }).selectOption("Yes");
  await bankInformationPage.selectAccountNo("Yes");
  await bankInformationPage.selectBankLocation("204101");
  await bankInformationPage.selectBankName("802121");
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

  // Wait for the element to be present
  await page2.getByLabel("Scheme Ref No:").waitFor();

  const schemeRefValue = await page2.getByLabel("Scheme Ref No:").inputValue();
  console.log("SRN from locator: " + schemeRefValue);
  const filePath = path.resolve(__dirname, "schemeRefValue.json");
  fs.writeFileSync(filePath, JSON.stringify({ schemeRefValue }));

  // Check if the file exists
  if (fs.existsSync(filePath)) {
    console.log("File schemeRefValue.json exists at path: " + filePath);
  } else {
    console.log("File schemeRefValue.json does not exist at path: " + filePath);
  }

  // Perform other actions as needed
  await page2.getByRole("button", { name: "Close" }).click();
});
