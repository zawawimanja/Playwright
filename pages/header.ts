// loginPage.ts

import { Page } from "@playwright/test";

export class HeaderPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickUserProfile() {
    await this.page.getByRole("link", { name: "User Profile" }).click();
  }

  async clickSignOut() {
    await this.page.getByRole("link", { name: "Sign Out" }).click();
  }
}
