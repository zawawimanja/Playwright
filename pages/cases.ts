import { Page } from "@playwright/test";
import { SubmitPage } from "../pages/submit";

export class CasesPage {
  private page: Page;
  private submitPage: SubmitPage;
  private schemeRefValue: string;

  constructor(page: Page, submitPage: SubmitPage) {
    this.page = page;
    this.submitPage = submitPage;
  }

  async init() {
    this.schemeRefValue = "E11NTA20250000008";
    console.log(" SRN " + this.schemeRefValue);
  }

  get casesCreated() {
    return this.schemeRefValue;
  }

  get frameLocator() {
    return this.page.frameLocator("#baristaPageOut");
  }
}
