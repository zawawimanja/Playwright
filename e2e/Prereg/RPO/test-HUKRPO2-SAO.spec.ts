import { test, expect } from "@playwright/test";
import { login } from "../../../utils/base"; // Import from base.ts
import { PreregistrationPage } from "../../../pages/prereg";
import { LeftTabPage } from "../../../pages/left_tab";
import { RemarksPage } from "../../../pages/remarks";
import { PreviewSubmissionPage } from "../../../pages/preview_submission";
import { WagesInfoPage } from "../../../pages/wages_info";
import { InsuredPersonInfoPage } from "../../../pages/insured_person_info";
import { SupportingDocumentPage } from "../../../pages/support_doc";
import { RecommendationPage } from "../../../pages/recommendation";
import { ApprovalPage } from "../../../pages/approval";
import { SmbInformationPage } from "../../../pages/smb_info";
import { CasesPage } from "../../../pages/cases";
import { SubmitPage } from "../../../pages/submit";
import { MyCasesPage } from "../../../pages/mycases";
import { HeaderPage } from "../../../pages/header";
import { Contribution56Page } from "../../../pages/contribution_56";
import { ButtonPage } from "../../../utils/button";

test.beforeEach(async ({ page }) => {
  // await login(page, "roliana.pks", "u@T_roliana");
  await login(page, "uat_ali", "u@T_ali");
});

export let schemeRefValue: string;
test("Prereg SAO RPO", async ({ page }) => {
  const preregPage = new PreregistrationPage(page);
  const leftTabPage = new LeftTabPage(page);
  let submitPage = new SubmitPage(page);
  const casesPage = new CasesPage(page, submitPage);
  const myCasesPage = new MyCasesPage(page, casesPage);
  await casesPage.init("RPO");

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
    if (await myCasesPage.clickS2Case("SAO RPO")) {
      caseFound = true;
      console.log(`Case found for user ${loginUser}`);
      break;
    } else {
      const headerPage = new HeaderPage(page);

      headerPage.clickUserProfile();
      headerPage.clickSignOut();
      //await login(page, "uat_ali", "u@T_ali");
      await login(page, "roliana.pks", "u@T_roliana");
    }
  }

  const pagePromise = page.waitForEvent("popup");
  await page.frameLocator("#baristaPageOut").frameLocator("#APWorkCenter").getByText("Open Task").click();
  const page2 = await pagePromise;

  // const draftPage = new DraftPage(page2);
  // if ((await draftPage.closeButton.count()) > 0) {
  //   await draftPage.closeButton.waitFor();
  //   await draftPage.clickCloseButton();
  // }

  const remarksPage = new RemarksPage(page2);
  await remarksPage.remarksButton.waitFor();
  await expect(remarksPage.remarksButton).toBeVisible();
  await expect(remarksPage.sectionTabs).toContainText("Remarks");
  await remarksPage.remarksButton.waitFor();
  await remarksPage.addRemarksButton.click();
  //await remarksPage.textboxIO.fill("test io");

  // await page2.locator("#subCtrlPreviewRow1-65e9-46724-95aa-00ad").getByRole("textbox").click();
  // await page2.locator("#subCtrlPreviewRow1-65e9-46724-95aa-00ad").getByRole("textbox").fill("test sao");
  // await page2.getByRole("button", { name: "Save Remarks" }).click();

  // await remarksPage.saveRemarksButton.click();

  const insuredPersonInfoPage = new InsuredPersonInfoPage(page2);
  await insuredPersonInfoPage.insuredPersonInfoButtonRPO.waitFor();
  await insuredPersonInfoPage.insuredPersonInfoButtonRPO.isVisible();
  await insuredPersonInfoPage.clickInsuredPersonInfoButtonRPO;

  await page2.getByRole("button", { name: "Endorsement" }).click();
  await page2.getByLabel("Action*").selectOption("10203");

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
