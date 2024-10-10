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

  get schemeRefNo() {
    return this.page.getByLabel("Scheme Ref No.");
  }

  get textboxIO() {
    return this.page.locator("#AddRemarksDetailsR").getByRole("textbox");
  }

  get caseStatusPendingApproval_IO() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Approval" });
  }

  get caseStatusPendingInvestigation_SAO() {
    return this.page.getByRole("heading", { name: "Case Status: Pending Investigation" });
  }

  get submitButton() {
    return this.page.getByRole("button", { name: "Submit" });
  }
}
