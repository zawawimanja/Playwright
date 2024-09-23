import { Page } from '@playwright/test';


export class TimePage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;

    }


    private get baristaPageOut() {
        return this.page.frameLocator('#baristaPageOut');
    }

    async selectDate(year: string, month: string) {
        await this.baristaPageOut.getByRole('combobox').nth(3).selectOption(year);
        await this.baristaPageOut.getByRole('combobox').nth(2).selectOption(month);
  
       
     

        
    }




      async selectTime(hour: string, minute: string, period: string) {
    await this.baristaPageOut.locator('dd').filter({ hasText: `${hour} am${minute} am${period} am` }).getByRole('combobox').selectOption('1');
  }

  async selectOption(index: number, value: string) {
    await this.baristaPageOut.getByRole('combobox').nth(index).selectOption(value);
  }
}
