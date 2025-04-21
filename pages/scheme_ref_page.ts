import { Page, Locator } from '@playwright/test';

export class SchemeRefPage {
  private page: Page;
  private schemeRefNoLabel: Locator;
  private closeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.schemeRefNoLabel = page.getByLabel('Scheme Ref No:');
    this.closeButton = page.getByRole('button', { name: 'Close' });
  }

  /**
   * Waits for the Scheme Reference Number field to be visible.
   */
  async waitForSchemeRefNo() {
    await this.schemeRefNoLabel.waitFor();
  }

  /**
   * Clicks the Close button on the page.
   */
  async clickCloseButton() {
    await this.closeButton.click();
  }
}