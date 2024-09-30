// loginPage.ts

import { Page } from "@playwright/test";

export class LeftTabPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickPreregistration() {
    await this.page.getByRole("link", { name: "Pre-Registration", exact: true }).click();
  }

  async clickMyCases() {
    await this.page.getByRole("link", { name: "My Cases" }).click();
  }

  async clickHUKPreregistration() {
    await this.page.getByRole("link", { name: "HUK Pre-Registration" }).click();
  }

  async clickCreateRevision() {
    await this.page.getByRole("link", { name: "Create Revision" }).click();
  }

  get preregistrationLink() {
    return this.page.getByRole("link", { name: "Pre-Registration", exact: true });
  }

  get myCasesLink() {
    return this.page.getByRole("link", { name: "My Cases" });
  }

  get leftBar() {
    return this.page.locator(".ap-Menu");
  }

  get pageBuilderRoot() {
    return this.page.locator("#page-builder-root");
  }
}
