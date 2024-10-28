import { Page } from "@playwright/test";

export class ButtonPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOK() {
    await this.page.getByRole("button", { name: "OK" }).click();
  }

  async clickSubmit() {
    await this.page.getByRole("button", { name: "Submit" }).click();
  }

  async clickYes() {
    await this.page.getByRole("button", { name: "Yes" }).click();
  }

  async clickNew() {
    await this.page.getByRole("button", { name: "New" }).click();
  }

  async clickAdd() {
    await this.page.getByRole("button", { name: "Add" }).click();
  }
}
