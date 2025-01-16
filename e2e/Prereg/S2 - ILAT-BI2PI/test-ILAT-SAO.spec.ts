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

test.beforeEach(async ({ page }) => {
  // await login(page, "roliana.pks", "u@T_roliana");
  await login(page, "uat_ali", "u@T_ali");
});

export let schemeRefValue: string;
test("Prereg SAO ILAT S2", async ({ page }) => {
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
    if (await myCasesPage.clickILAT("SAO")) {
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
  await insuredPersonInfoPage.clickInsuredPersonInfoButton();

  //add wages info
  //add Inconsistent & Doubtful Information
  // add Medical Board Decision
  //add Scheme Qualifying

  const contribution56Page = new Contribution56Page(page2);
  await contribution56Page.clickContribution56Button();

  await page2.getByRole("button", { name: "Add Record" }).click();

  //await page2.getByRole("button", { name: "Edit" }).click();

  // await page2.locator("#Contribution56").getByRole("textbox").first().fill("E1300001143K");

  await page2.locator('[id^="Contribution56_EmployerCode-"]').nth(0).fill("E1100024537Z");
  //await page2.locator('[id^="Contribution56_EmployerCode-"]').nth(1).fill("E1100022162V");

  await page2.getByRole("button", { name: "Search" }).click();

  // if loop stop then row will be + 1
  for (let i = 0; i < 180; i++) {
    //await page.waitForTimeout(1000);

    await page2.getByRole("button", { name: "Add Record" }).first().click();

    // Fill the input field for year
    await page2.locator("input.textInput[id^='Contribution56_WagesInfo_Year-']").nth(i).fill("2012");

    // Select the month option
    await page2.locator("[id^='Contribution56_WagesInfo_Month-']").nth(i).selectOption("2");

    // Fill the wages input
    await page2.locator("input.textInput[id^='Contribution56_WagesInfo_Wages-']").nth(i).fill("100");
    // Select an option from the combobox (3rd combobox)

    await page2.locator("[id^='Contribution56_WagesInfo_Source-']").nth(i).selectOption("9607901");

    //Check the checkbox with the label "Recommend"
    //  await page2.getByRole("checkbox", { name: "Recommend", exact: true }).nth(i).check();

    await page2.locator("[id^='Contribution56_WagesInfo_Recommend-']").getByLabel("Recommend").nth(i).check();
  }

  //smb info
  const SMBInformationPage = new SmbInformationPage(page2);
  await SMBInformationPage.clickSMBInfoButton();

  const recommendationPage = new RecommendationPage(page2);
  await recommendationPage.clickSAORecommendationButton();

  await page.waitForTimeout(10000);
  const approvalPage = new ApprovalPage(page2);
  await approvalPage.clickApprovalButton();

  await expect(approvalPage.actionApproveAfterMB).toBeVisible();
  await approvalPage.actionApproveAfterMB.waitFor();

  await approvalPage.selectSAOActionOptionAfterMB();

  //wages info
  const wagesInfoPage = new WagesInfoPage(page2);
  await wagesInfoPage.clickWagesInfoButton();

  const supportingDocumentPage = new SupportingDocumentPage(page2);
  await supportingDocumentPage.clickSupportingDocumentButton();

  const previewSubmissionPage = new PreviewSubmissionPage(page2);
  await previewSubmissionPage.clickPreviewSubmissionButton();
  await previewSubmissionPage.clickShowPreviewButton();

  await previewSubmissionPage.clickSubmitButton();
  await previewSubmissionPage.clickYesButton();

  await page.waitForTimeout(15000);

  submitPage = new SubmitPage(page2);

  await expect(submitPage.schemeRefNo).toBeVisible();

  await expect(submitPage.caseStatusPendingEndorsement_SAO).toBeVisible();

  await submitPage.submitButton.click();
});
