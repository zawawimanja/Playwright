import { Page } from "@playwright/test";

export class CasesPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get casesCreated() {
    return "E11NTO20240010077";
  }
}
