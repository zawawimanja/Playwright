// loginPage.ts

import { Page } from "@playwright/test";

export class DraftPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get closeButton() {
    return this.page.getByRole("button", { name: "Close" });
  }

  async clickCloseButton() {
    await this.closeButton.click();
  }
}
