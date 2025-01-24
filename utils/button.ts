import { Page } from "@playwright/test";

export class ButtonPage {
  constructor(private page: Page) {}

  async clickButtonByName(name: string) {
    await this.page.getByRole("button", { name }).click();
  }

  async clickOK() {
    await this.clickButtonByName("OK");
  }

  async clickSubmit() {
    await this.clickButtonByName("Submit");
  }

  async clickYes() {
    await this.clickButtonByName("Yes");
  }

  async clickNew() {
    await this.clickButtonByName("New");
  }

  async clickAdd() {
    await this.clickButtonByName("Add");
  }

  async clickSave() {
    await this.clickButtonByName("Save");
  }

  async clickClose() {
    await this.clickButtonByName("Close");
  }
}
