import { Page } from "@playwright/test";

export class ConfirmationOfInsuredPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Confirmation of Insured button

   
   */
  get confirmationOfInsuredButton() {
    return this.page.getByRole("button", { name: "Confirmation of Insured" });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  /**
   * Completed checkbox
   */
  get completedCheckbox() {
    return this.page.getByLabel("Completed");
  }

  /**
   * Click on the Confirmation of Insured button
   */
  async clickConfirmationOfInsuredButton() {
    await this.confirmationOfInsuredButton.click();
  }

  /**
   * Check if the Confirmation of Insured button is visible
   */

  /**
   * Check if the section tabs element contains the text 'Confirmation of Insured Person/Dependants/Claimant'
   */

  /**
   * Check the Completed checkbox
   */
  async checkCompletedCheckbox() {
    await this.completedCheckbox.check(); // Check the checkbox
  }

  async isCompletedCheckboxChecked(): Promise<boolean> {
    return await this.completedCheckbox.isChecked(); // Return the checkbox state
  }
}
