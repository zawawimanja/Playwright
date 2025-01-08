// loginPage.ts

import { Page } from "@playwright/test";

export class LeftTabPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickPreregistration() {
    await this.page
      .locator("div")
      .filter({ hasText: /^Pre-Registration$/ })
      .nth(1)
      .click();
  }

  async clickMyCases() {
    //await this.page.getByRole("link", { name: "My Cases" }).click();

    await this.page
      .locator("div")
      .filter({ hasText: /^My Cases$/ })
      .nth(1)
      .click();
  }

  async clickHUKPreregistration() {
    await this.page.getByRole("link", { name: "HUK Pre-Registration" }).click();
  }

  async clickCreateRevision() {
    await this.page
      .locator("div")
      .filter({ hasText: /^Create Revision$/ })
      .nth(1)
      .click();
  }

  get preregistrationLink() {
    return this.page.getByRole("link", { name: "Pre-Registration", exact: true });
  }

  get createRevisionLink() {
    return this.page.getByRole("link", { name: "Create Revision", exact: true });
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
