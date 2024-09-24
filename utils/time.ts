import { Page } from '@playwright/test';

export class TimePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get baristaPageOut() {
    return this.page.frameLocator('#baristaPageOut');
  }

  private get timeComboBox() {
    return this.baristaPageOut.locator('dd').filter({ hasText: '12 am01 am02 am03 am04 am05' }).getByRole('combobox');
  }

  async selectTimeOption(hour: string,minutes: string,second: string,) {
    await this.timeComboBox.selectOption(hour);
    await this.timeComboBox2.selectOption(minutes);
     await this.timeComboBox3.selectOption(second);

  }

  private get timeComboBox2() {
    return this.baristaPageOut.getByRole('combobox').nth(3);
  }

  private get timeComboBox3() {
    return this.baristaPageOut.getByRole('combobox').nth(4);
  }

    async selectTimeOption2(option: string) {
    await this.timeComboBox2.selectOption(option);
  }

  async selectTimeOption3(option: string) {
    await this.timeComboBox3.selectOption(option);
  }


}