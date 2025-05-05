import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
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
import { BankInformationPage } from "../../../pages/bank_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { ConfirmationOfInsuredPage } from "../../../pages/confirm_person";
import { RecommendationPage } from "../../../pages/recommendation";
import { MedicalOpinionPage } from "../../../pages/medical_opinion";
import { PreparerInformationPage } from "../../../pages/preparer_info";
import { CaseInformationPage } from "../../../pages/case_info";
import { ApprovalPage } from "../../../pages/approval";
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { AccidentInformationPage } from "../../../pages/accident_info";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";
import { HeaderPage } from "../../../pages/header";
import { ButtonPage } from "../../../utils/button";
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, "roliana.pks", "u@T_roliana");
 // await login(page, "uat_ali", "u@T_ali");
 // await login(page, "uat_sukri", "u@T_sukri");
});

test("Prereg SAO NTA", async ({ page }) => {
  // Read current row from counter file
  const counterPath = path.resolve(__dirname, 'counter.json');
  let counter = { currentRow: 1 };
  
  if (fs.existsSync(counterPath)) {
    counter = JSON.parse(fs.readFileSync(counterPath, 'utf-8'));
  }

  // At the start of the test
  console.log('Starting test with row:', counter.currentRow);

  try {
    const leftTabPage = new LeftTabPage(page);
    let submitPage = new SubmitPage(page);
    const casesPage = new CasesPage(page, submitPage);
    const myCasesPage = new MyCasesPage(page, casesPage);
    await casesPage.init("NTA");

    let loginUser = "roliana.pks";
    let caseFound = false;

    while (!caseFound) {
      // // Click my cases left tab
      // await leftTabPage.clickMyCases();
      await page.getByRole('listitem').filter({ hasText: 'My Cases' }).locator('div').click();

      // Check if the case exists for the current login user
      if (await myCasesPage.clickAccident("SAO")) {
        caseFound = true;
        console.log(`Case found for user ${loginUser}`);
        break;
      } else {
        const headerPage = new HeaderPage(page);

        headerPage.clickUserProfile();
        headerPage.clickSignOut();
        await login(page, "uat_ali", "u@T_ali");
        //  await login(page, "roliana.pks", "u@T_roliana");
        //await login(page, 'uat_redzuan', 'u@T_redzuan');
      }
    }

    const pagePromise = page.waitForEvent("popup");
    await page.frameLocator("#baristaPageOut").frameLocator("#APWorkCenter").getByText("Open Task").click();
    const page2 = await pagePromise;

    const draftPage = new DraftPage(page2);
    if ((await draftPage.closeButton.count()) > 0) {
      await draftPage.closeButton.waitFor();
      await draftPage.clickCloseButton();
    }

    const remarksPage = new RemarksPage(page2);
    await remarksPage.remarksButton.waitFor();
    await expect(remarksPage.remarksButton).toBeVisible();
    await expect(remarksPage.sectionTabs).toContainText("Remarks");
    await remarksPage.remarksButton.waitFor();
    await remarksPage.addRemarksButton.click();
    await remarksPage.textboxIO.fill("test sao");

    await remarksPage.saveRemarksButton.click();

    const caseInformationPage = new CaseInformationPage(page2);
    await caseInformationPage.clickCaseInformationButton();

    const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
    await insuredPersonInfoPage.clickInsuredPersonInfoButton();

    const employerInfoPage = new EmployerInfoPage(page2);
    await employerInfoPage.clickEmployerInfoButton();

    //add Reference Notice Information

    //add accident information
    const accidentInformationPage = new AccidentInformationPage(page2);
    await accidentInformationPage.clickAccidentInformationButton();

    const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
    await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

    const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
    await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

    //add appointment
    //add investigation document

    const medicalOpinionPagePage = new MedicalOpinionPage(page2);
    await medicalOpinionPagePage.clickMedicalOpinionButton();

    const recommendationPage = new RecommendationPage(page2);
    await recommendationPage.clickSAORecommendationButton();

    const approvalPage = new ApprovalPage(page2);
    await approvalPage.clickApprovalButton();

    await approvalPage.selectSAOActionOptionNTA("Approve");
    await approvalPage.selectUnderSectionEmploymentInjury();

    const recommendationPage1 = new RecommendationPage(page2);
    await recommendationPage1.clickSAORecommendationButton();

    //add wages information page
    const wagesInfoPage = new WagesInfoPage(page2);
    await wagesInfoPage.clickWagesInfoButton();

    //add  medical certificate page
    const medicalCertificatePage = new MedicalCertificatePage(page2);
    await medicalCertificatePage.clickMedicalCertificateNTAButton();

    await medicalCertificatePage.clickMCApprovalStatus();

    //add bank information page
    const bankInformationPage = new BankInformationPage(page2);
    await bankInformationPage.clickBankInformationButton();

    const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
    await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();
    await confirmationOfInsuredPage.checkCompletedCheckbox();

    const supportingDocumentPage = new SupportingDocumentPage(page2);
    await supportingDocumentPage.clickSupportingDocumentButton();

    const previewSubmissionPage = new PreviewSubmissionPage(page2);
    await previewSubmissionPage.clickPreviewSubmissionButton();
    await previewSubmissionPage.clickShowPreviewButton();

    await previewSubmissionPage.clickSubmitButton();
    const buttonPage = new ButtonPage(page2);
    buttonPage.clickYes();
    // await previewSubmissionPage.clickYesButton();

    const page3Promise = page2.waitForEvent("popup");
    const page3 = await page3Promise;

    // Wait for the element to be present
    await page3.getByLabel("Scheme Ref No:").waitFor();

    // Perform other actions as needed
    await page3.getByRole("button", { name: "Close" }).click();

    // If test reaches here without errors, increment counter
    console.log('Current row before increment:', counter.currentRow);
    counter.currentRow++; // Increment the counter
    console.log('Row after increment:', counter.currentRow);
    
    // Save the incremented counter
    fs.writeFileSync(counterPath, JSON.stringify(counter, null, 2));
    console.log(`Test passed. Next row will be: ${counter.currentRow}`);

  } catch (error) {
    console.error('Test failed:', error);
    console.log('Test failed, keeping same row:', counter.currentRow);
    throw error; // Re-throw error to mark test as failed
  }
});
