import { Page } from "@playwright/test";

export class CaseInformationPage {
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

  get textbox() {
    return this.page.getByRole("textbox");
  }

  get caseInformationButton() {
    return this.page.getByRole("button", { name: "Case Information" });
  }

  async clickCaseInformationButton() {
    await this.caseInformationButton.click();
  }

  async clickCaseInformationHUKButton() {
    await this.caseInformationButton.nth(0).click();
  }
}
