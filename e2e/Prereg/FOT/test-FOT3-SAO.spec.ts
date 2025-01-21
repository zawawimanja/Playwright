import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { PreferredSOCSOOfficePage } from "../../../pages/socso_office";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { RecommendationPage } from "../../../pages/recommendation";
import { MedicalOpinionPage } from "../../../pages/medical_opinion";
import { PreparerInformationPage } from "../../../pages/preparer_info";
import { CaseInformationPage } from "../../../pages/case_info";
import { InconsistentDoubtfulPage } from "../../../pages/inconsistentdoubtful";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";
import { HeaderPage } from "../../../pages/header";
import { ButtonPage } from "../../../utils/button";

test.beforeEach(async ({ page }) => {
  //await login(page, "roliana.pks", "u@T_roliana");
  await login(page, "uat_ali", "u@T_ali");
});

export let schemeRefValue: string;
test("Prereg SAO FOT", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init();

  let loginUser = "roliana.pks";
  let caseFound = false;

  while (!caseFound) {
    await leftTabPage.leftBar.waitFor();
    await expect(leftTabPage.leftBar).toBeVisible();

    await expect(leftTabPage.myCasesLink).toBeVisible();
    await leftTabPage.myCasesLink.waitFor();

    // Click my cases left tab
    await leftTabPage.clickMyCases();

    // Check if the case exists for the current login user
    if (await myCasesPage.clickPKT("SAO")) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      // await login(page, "uat_ali", "u@T_ali");
      await login(page, "roliana.pks", "u@T_roliana");
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

  const preparerInformationPage = new PreparerInformationPage(page2);
  await preparerInformationPage.clickpreparerInformationButtonPKT();

  const caseInformationPage = new CaseInformationPage(page2);
  await caseInformationPage.clickCaseInformationButton();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  await page2.getByRole("button", { name: "Death Info" }).click();

  const preferredSOCSOOfficePage = new PreferredSOCSOOfficePage(page2);
  await preferredSOCSOOfficePage.clickPreferredSOCSOOfficeButton();

  const inconsistentDoubtfulPage = new InconsistentDoubtfulPage(page2);
  await inconsistentDoubtfulPage.clickInconsistentDoubtfulButton();

  //add appointment
  //add investigation document

  const medicalOpinionPagePage = new MedicalOpinionPage(page2);
  await medicalOpinionPagePage.clickMedicalOpinionButton();

  await page2.getByRole("button", { name: "Invalidity Scheme Qualifying" }).click();
  await page2.getByRole("button", { name: "Contribution Based on Section" }).click();
  await page2.getByRole("button", { name: "Wages Information (SI)" }).click();

  await page2.getByRole("button", { name: "Dependent Info" }).click();
  const page3Promise = page2.waitForEvent("popup");
  await page2.getByRole("button", { name: "Update" }).click();
  const page3 = await page3Promise;
  await page3.getByLabel("Eligible as Dependent*").selectOption("90102");
  await page3.getByRole("button", { name: "Save" }).click();

  await page2.getByRole("button", { name: "FPM Info" }).click();

  const recommendationPage1 = new RecommendationPage(page2);
  await recommendationPage1.clickSAORecommendationButton();

  //select approval

  await page2.getByRole("button", { name: "Approval" }).click();
  await page2.getByLabel("Action*").selectOption("10211");

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  const buttonPage = new ButtonPage(page2);
  buttonPage.clickYes();

  const page4Promise = page2.waitForEvent("popup");
  const page4 = await page4Promise;

  // Wait for the element to be present
  await page4.getByLabel("Scheme Ref No:").waitFor();

  // Perform other actions as needed
  await page4.getByRole("button", { name: "Close" }).click();
});
