import { Page } from "@playwright/test";

export class SubmitPage {
  private REMARKS_BUTTON_SELECTOR = '[role="button"][name="Remarks"]';
  private SECTION_TABS_SELECTOR = "#sectionTabs";

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get remarksButton() {
    return this.page.locator(this.REMARKS_BUTTON_SELECTOR);
  }

  get sectionTabs() {
    return this.page.locator(this.SECTION_TABS_SELECTOR);
  }

  get addRemarksButton() {
    return this.page.getByRole("button", { name: "Add Remarks" });
  }

  get saveRemarksButton() {
    return this.page.getByRole("button", { name: "Save Remarks" });
  }

  // get schemeRefNo() {
  //   return this.page.getByLabel("Scheme Ref No:");
  // }

  get schemeRefNo() {
    return this.page.getByLabel("Scheme Ref No:");
  }

  // schemeRefNo() {
  //   return this.page.getByLabel("Scheme Ref No:");
  // }

  get textboxIO() {
    return this.page.locator("#AddRemarksDetailsR").getByRole("textbox");
  }

  get caseStatusPendingApproval_IO_SCO() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Approval" });
  }

  async getSchemeRefValue() {
    return await this.schemeRefNo.inputValue();
  }

  get caseStatusPendingRecommendation_MB() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Recommendation" });
  }

  get caseStatusPendingInvestigation_PK_SAO() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Investigation" });
  }

  get caseStatusPendingEndorsement_SAO() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Endorsement" });
  }

  get caseStatusPendingAssesment_SAO_BeforeMB() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Assessment" });
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }
}
