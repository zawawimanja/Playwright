// loginPage.ts

import { Page } from '@playwright/test';

export class PaymentOptionPage {
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

    
      get paymentOptionButton() {
    return this.page.getByRole('button', { name: 'Payment Option' });

  }


   async selectPaymentOption(option: string) {
    await this.paymentOptionLocator.selectOption(option);

    
  }

    /**
   * Click on the Preview & Submission button
   */
  async clickPaymentOptionButton() {
    await this.paymentOptionButton.click();
  }


   private get paymentOptionLocator() {
    return this.page.getByLabel('Payment Option*')

  }





}
