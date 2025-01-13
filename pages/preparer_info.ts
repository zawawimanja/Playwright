import { Page } from "@playwright/test";

export class PreparerInformationPage {
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

  get preparerInformationButton() {
    return this.page.getByRole("button", { name: "Preparer Information" });
  }

  get preparerInformationButtonPKT() {
    return this.page.getByRole("button", { name: "Preparer Info" });
  }

  async clickpreparerInformationButton() {
    await this.preparerInformationButton.click();
  }

  async clickpreparerInformationButtonPKT() {
    await this.preparerInformationButtonPKT.click();
  }
}
