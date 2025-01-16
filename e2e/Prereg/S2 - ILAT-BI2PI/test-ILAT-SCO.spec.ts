import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { DraftPage } from "../../../pages/draft";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { RecommendationPage } from "../../../pages/recommendation";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";
import { HeaderPage } from "../../../pages/header";
import { ButtonPage } from "../../../utils/button";

test.beforeEach(async ({ page }) => {
  await login(page, "atilia.pks", "u@T_atilia");
  //await login(page, "nazira.pks", "u@T_nazira");
});

export let schemeRefValue: string;
test("Prereg SCO ILAT S2", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);

  let loginUser = "atilia.pks";

  let caseFound = false;

  while (!caseFound) {
    await leftTabPage.leftBar.waitFor();
    await expect(leftTabPage.leftBar).toBeVisible();

    await expect(leftTabPage.myCasesLink).toBeVisible();
    await leftTabPage.myCasesLink.waitFor();

    // Click my cases left tab
    await leftTabPage.clickMyCases();
    await casesPage.init(); // Initialize and read schemeRefValue

    console.log("Retrieved SRN: " + casesPage.casesCreated); // Log retrieved value
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
      // await login(page, "atilia.pks", "u@T_atilia");
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

  await remarksPage.textboxSCO.fill("test sco");

  await remarksPage.saveRemarksButton.click();

  //add Revision Information

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //add wages information

  //add mb board decision

  //add Scheme Qualifying

  //add medical opinion

  //temporary solution
  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickRecommendationButton();
  await recommendationPage.selectActionOptionSCOILATS2();

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

  const schemeRefValueFromLocator = await page3.getByLabel("Scheme Ref No:").inputValue();
  console.log("SRN from locator: " + schemeRefValueFromLocator);

  await page3.getByRole("button", { name: "Close" }).click();
});
