import { Page } from "@playwright/test";

export class SmbInformationPage {
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

  get textboxIO() {
    return this.page.locator("#AddRemarksDetailsR").getByRole("textbox");
  }

  get SMBInfo() {
    return this.page.getByLabel("SMB Information");
  }

  /**
   * Click on the Certification by Employer button
   */
  async clickSMBInfoButton() {
    await this.SMBInfo.click();
  }
}
