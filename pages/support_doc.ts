import { Page } from "@playwright/test";

export class SupportingDocumentPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Supporting Document button
   */
  get supportingDocumentButton() {
    return this.page.getByRole("button", { name: "Supporting Document" });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  /**
   * Click on the Supporting Document button
   */
  async clickSupportingDocumentButton() {
    await this.supportingDocumentButton.click();
  }

  async clickSupportingDocumentButtonPKT() {
    await this.supportingDocumentButton.nth(0).click();
  }

  /**
   * Check if the Supporting Document button is visible
   */

  /**
   * Check if the section tabs element contains the text 'Supporting Document'
   */
}
