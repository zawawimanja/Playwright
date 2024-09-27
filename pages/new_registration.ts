// loginPage.ts

import { Page } from '@playwright/test';

export class NewRegistrationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get closeButton() {
  
        return this.page.locator('#btnClose');
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }


      get newRegistratioButton() {
    return this.page.getByRole('button', { name: 'New Registration' });
 

  }

    /**
   * Click on the Preview & Submission button
   */
  async clickNewRegistrationButton() {
    await this.newRegistratioButton.click();
  }




}
