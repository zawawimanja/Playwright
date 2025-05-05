import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
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
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";
import { HeaderPage } from "../../../pages/header";
import { InvalidityInfoPage } from "../../../pages/invalidity_info";
import { ButtonPage } from "../../../utils/button";
import { RemarksPage } from "../../../pages/remarks";

test.beforeEach(async ({ page }) => {
  await page.setViewportSize({ width: 1920, height: 1080 });
  await login(page, "atilia.pks", "u@T_atilia");
  //await login(page, "nazira.pks", "u@T_nazira");
});


test("Prereg SCO ILAT", async ({ page }) => {

  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init("NTI");

  let loginUser = "atilia.pks";
  let caseFound = false;

  while (!caseFound) {

    await page.getByRole('listitem').filter({ hasText: 'My Cases' }).locator('div').click();


    // Check if the case exists for the current login user
    if (await myCasesPage.clickILAT("SCO")) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      // Re-login with the new user
      await page.reload(); // Reload the page to start fresh

      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      await login(page, "nazira.pks", "u@T_nazira");
      //await login(page, "atilia.pks", "u@T_atilia");
    }
  }

  const pagePromise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").frameLocator("#APWorkCenter").getByText("Open Task").click();
  const page2 = await pagePromise;

  await page.waitForLoadState("networkidle");
  const draftPage = new DraftPage(page2);
  if ((await draftPage.closeButton.count()) > 0) {
    await draftPage.closeButton.waitFor();
    await draftPage.clickCloseButton();
  }

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");

  await remarksPage.addRemarksButton.click();
  await remarksPage.textbox.fill("test");
  await remarksPage.saveRemarksButton.click();

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButton();

  const caseInformationPage = new CaseInformationPage(page2);
  caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //add reference notice information
  const invalidtyInformation = new InvalidityInfoPage(page2);

  await invalidtyInformation.clickInvalidityInformation();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  //bank info
  const bankInformationPage = new BankInformationPage(page2);
  await bankInformationPage.clickBankInformationButton();

  const confirmationOfInsuredPage = new ConfirmationOfInsuredPage(page2);
  await confirmationOfInsuredPage.clickConfirmationOfInsuredButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();
  //wages
  const wagesInfoPage = new WagesInfoPage(page2);
  await wagesInfoPage.clickWagesInfoButton();
  //qc

  await page2.getByRole("button", { name: "Scheme Qualifying" }).click();

  const medicalOpinionPage = new MedicalOpinionPage(page2);
  await medicalOpinionPage.medicalOpinionButton.waitFor();
  await expect(medicalOpinionPage.medicalOpinionButton).toBeVisible();
  await medicalOpinionPage.clickMedicalOpinionButton();

  await page2.waitForLoadState("networkidle");

  const recommendationPage = new RecommendationPage(page2);

  await recommendationPage.clickRecommendationButton();
  await recommendationPage.selectActionRecommendNTAILAT("10207");

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage = new ButtonPage(page2);
  buttonPage.clickYes();

  const page3Promise = page2.waitForEvent("popup");
  const page3 = await page3Promise;

  // Wait for the element to be present
  await page3.getByLabel("Scheme Ref No:").waitFor();

  // Perform other actions as needed
  await page3.getByRole("button", { name: "Close" }).click();
});
