import { Page } from "@playwright/test";

export class WagesInfoPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Wages Information button
   */
  get wagesInfoButton() {
    return this.page.getByRole("button", { name: "Wages Information" });
  }

  get SIwagesInfoButton() {
    return this.page.getByRole("button", { name: "SI Wages Information" });
  }

  /**
   * Click on the Wages Information button
   */
  async clickWagesInfoButton() {
    await this.wagesInfoButton.click();
  }

  async clickSIWagesInfoButton() {
    await this.SIwagesInfoButton.click();
  }

  get acceptwagesInfo() {
    return this.page.locator('[id^="AcceptWagesInfo-"]');
  }

  get acceptwagesInfoOD() {
    return this.page.locator('[id^="AcceptWagesInfoSub1-"]');
  }

  async selectWagesInfoSection(text, i) {
    await this.acceptwagesInfo.nth(i).selectOption(text);
  }

  async selectWagesInfoSectionNTO(text, i) {
    await this.acceptwagesInfoOD.nth(i).selectOption(text);
  }

  

  async selectAllEnabledWagesOptions(text) {
    const count = await this.acceptwagesInfo.count(); // Get the number of dropdowns
    console.log(`Dropdown count: ${count}`);
    for (let i = 0; i < count - 2; i++) {
      const dropdown = this.acceptwagesInfo.nth(i);
      const isDisabled = await dropdown.evaluate((element) => (element as HTMLSelectElement).disabled); // Check if the dropdown is disabled

      if (!isDisabled) {
        await this.selectWagesInfoSection(text, i);
        console.log(`Selected "${text}" for enabled dropdown at index ${i}`);
      } else {
        console.warn(`Dropdown at index ${i} is disabled. Skipping selection.`);
      }
    }
  }

  async selectAllEnabledWagesOptionsOD(text) {
    const count = await this.acceptwagesInfoOD.count(); // Get the number of dropdowns
    console.log(`Dropdown count: ${count}`);
    for (let i = 0; i < count - 2; i++) {
      const dropdown = this.acceptwagesInfoOD.nth(i);
      const isDisabled = await dropdown.evaluate((element) => (element as HTMLSelectElement).disabled); // Check if the dropdown is disabled

      if (!isDisabled) {
        await this.selectWagesInfoSectionNTO(text, i);
        console.log(`Selected "${text}" for enabled dropdown at index ${i}`);
      } else {
        console.warn(`Dropdown at index ${i} is disabled. Skipping selection.`);
      }
    }
  }
}
