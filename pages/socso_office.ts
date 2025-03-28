import { Page } from "@playwright/test";

export class PreferredSOCSOOfficePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Preferred SOCSO Office button
   */
  get preferredSOCSOOfficeButton() {
    return this.page.getByRole("button", { name: "Preferred SOCSO Office" });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  /**
   * SOCSO Office select element
   */
  get socsoOfficeSelect() {
    return this.page.getByLabel("SOCSO Office*");
  }

  get socsoOfficeState() {
    return this.page.getByLabel("State*");
  }

  /**
   * Click on the Preferred SOCSO Office button
   */
  async clickPreferredSOCSOOfficeButton() {
    await this.preferredSOCSOOfficeButton.click();
  }

  /**
   * Select an option from the SOCSO Office select element
   * @param {string} option - The value of the option to select
   */
  async selectSOCSOOffice(option) {
    await this.socsoOfficeSelect.selectOption(option);
  }

  async selectSOCSOState(option) {
    await this.socsoOfficeState.selectOption(option);
  }
}
