import { Page } from "@playwright/test";

export class InconsistentDoubtfulPage {
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

  get caseInformationButton() {
    return this.page.getByRole("button", { name: "Case Information" });
  }

  async clickcaseInformationButton() {
    await this.caseInformationButton.click();
  }

  get inconsistentDoubtfulButton() {
    return this.page.getByRole("button", { name: "Inconsistent & Doubtful" });
  }

  async clickInconsistentDoubtfulButton() {
    await this.inconsistentDoubtfulButton.click();
  }
}
