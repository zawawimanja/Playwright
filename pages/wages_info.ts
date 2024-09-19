
import { Page } from '@playwright/test';

export class WagesInfoPage {

        private page: Page;


    constructor(page: Page) {
    this.page = page;
  }
  /**
   * Wages Information button
   */
  get wagesInfoButton() {
    return this.page.getByRole('button', { name: 'Wages Information' });
  }

  /**
   * Click on the Wages Information button
   */
  async clickWagesInfoButton() {
    await this.wagesInfoButton.click();
  }
}

