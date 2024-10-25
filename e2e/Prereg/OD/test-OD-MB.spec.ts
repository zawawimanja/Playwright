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
import { RecommendationPage } from "../../../pages/recommendation";
import { MedicalOpinionPage } from "../../../pages/medical_opinion";
import { PreparerInformationPage } from "../../../pages/preparer_info";
import { CaseInformationPage } from "../../../pages/case_info";
import { AppointmentPage } from "../../../pages/appointment";
import { ApprovalPage } from "../../../pages/approval";
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { CalendarPage } from "../../../utils/calendar";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";

test.beforeEach(async ({ page }) => {
  await login(page, "hilmi.pks", "u@T_hilmi");
  // await login(page, "aslam.pks", "u@T_aslam");
});

export let schemeRefValue: string;
test("Prereg MB OD", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init();

  await leftTabPage.leftBar.waitFor();
  await expect(leftTabPage.leftBar).toBeVisible();

  await expect(leftTabPage.myCasesLink).toBeVisible();
  await leftTabPage.myCasesLink.waitFor();

  //click my cases left tab
  await leftTabPage.clickMyCases();

  //click  my cases tab
  await myCasesPage.clickMyCases();

  await page.waitForTimeout(5000);

  await myCasesPage.clickODMB();

  const pagePromise = page.waitForEvent("popup");
  await myCasesPage.frameLocator.getByText("Open Task").click();
  const page2 = await pagePromise;

  const draftPage = new DraftPage(page2);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  await page2.getByRole("button", { name: "SMB Information" }).click();

  const page3Promise = page2.waitForEvent("popup");
  await page2.getByRole("button", { name: "New" }).click();
  const page3 = await page3Promise;
  await page3.getByRole("button", { name: "Add" }).click();
  const calendarPage = new CalendarPage(page3);

  await page3.waitForTimeout(5000);

  //session venue
  await page3.locator("#ctrlField1020").getByRole("combobox").selectOption("708056");

  //session date
  await page3.locator("#ctrlField1021").getByRole("textbox").click();

  await calendarPage.selectDateInsuredPersonPage("2021", "8", "15");

  //disease 5 blank default
  await expect(page3.getByText("Disease is in Schedule")).toBeVisible();
  await expect(page3.locator("#ctrlField1022")).toContainText("Disease is in Schedule 5");
  await page3.locator("#ctrlField1022").getByRole("combobox").selectOption("Yes");

  //disease work no default
  await page3.locator("#ctrlField1023").getByRole("combobox").selectOption("Yes");

  //mmi yes default
  await expect(page3.getByText("MMI Achieved")).toBeVisible();
  await expect(page3.locator("#ctrlField1024")).toContainText("MMI Achieved");
  await page3.locator("#ctrlField1024").getByRole("combobox").selectOption("Yes");

  //desc
  await expect(page3.getByText("Description of Disease")).toBeVisible();
  await expect(page3.locator("#ctrlField1025")).toContainText("Description of Disease");
  page3.locator("#ctrlField1025").getByRole("textbox").fill("test");

  //ass type
  await page3.locator("#ctrlField1026").getByRole("combobox").selectOption("Final");

  // Get the selected value to verify
  const selectedValue = await page3.locator("#ctrlField1026").getByRole("combobox").getAttribute("value");

  // Conditional logic based on the selected value
  if (selectedValue === "Provisional") {
    // Perform actions if the selected value is "Provisional"
  } else {
    // Perform actions if the selected value is not "Provisional"
  }

  // Fill the textbox with "100"  session ass
  await page3.locator("#ctrlField1027").getByRole("textbox").fill("10");

  //if choose provisional have assessment date

  // //jd result no default
  await page3.locator("#ctrlField1031").getByRole("combobox").selectOption("Yes");

  // Check if the value is "100"
  const value = await page3.locator("#ctrlField1027").getByRole("textbox").inputValue();

  //els
  if (value === "100") {
    // Perform actions if the value is "100"
    await page3.locator("#ctrlField1032").getByRole("combobox").selectOption("Yes");
  } else {
    // Perform actions if the value is not "100"
  }

  // //recommendation rehab no default
  await page3.locator("#ctrlField1033").getByRole("combobox").selectOption("Yes");

  // //remark recommendation
  await expect(page3.locator("#ctrlField1034")).toContainText("Remarks for Recommendation for Rehab");
  await page3.locator("#ctrlField1034").getByRole("textbox").fill("test");

  // //remarks textbox
  await expect(page3.locator("#previewPanel")).toContainText("Remarks");
  await page3.locator("#ctrlField1049").getByRole("textbox").fill("test");

  await page3.getByRole("button", { name: "OK" }).click();
  await page3.getByRole("button", { name: "Submit" }).click();
  await page3.getByRole("button", { name: "Yes" }).click();

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();

  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  //temporary solution
  await page2.waitForTimeout(10000);
  await remarksPage.clickRemarksButton();

  await remarksPage.addRemarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  await remarksPage.textboxIO.fill("test mb");
  await remarksPage.saveRemarksButton.click();

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  const employerInfoPage = new EmployerInfoPage(page2);
  await employerInfoPage.clickEmployerInfoButton();

  const certificationByEmployerPage = new CertificationByEmployerPage(page2);
  await certificationByEmployerPage.clickCertificationByEmployerButton();

  const occupationalDiseasePage = new OccupationalDiseasePage(page2);
  await occupationalDiseasePage.clickOccupationalDiseaseButton();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickRecommendationButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  await page2.reload();

  await page2.waitForTimeout(30000);

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.previewSubmissionButton.waitFor();
  await expect(previewSubmissionPage.previewSubmissionButton).toBeVisible();
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  await previewSubmissionPage.clickYesButton();

  await page2.waitForTimeout(15000);

  submitPage = new SubmitPage(page2);

  await expect(submitPage.caseStatusPendingRecommendation_MB).toBeVisible();

  await submitPage.submitButton.click();
});
