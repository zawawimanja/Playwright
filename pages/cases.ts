import { Page } from "@playwright/test";
import { SubmitPage } from "../pages/submit";

export class CasesPage {
  private page: Page;
  private submitPage: SubmitPage; // SubmitPage instance
  private schemeRefValue: string;

  constructor(page: Page, submitPage: SubmitPage) {
    this.page = page;
    this.submitPage = submitPage;
  }

  // async init() {
  //   this.schemeRefValue = await this.submitPage.schemeRefNo.inputValue();
  //   console.log(" SRN " + this.schemeRefValue);
  // }

  async init() {
    this.schemeRefValue = "E11NTO20240000065";

    console.log(" SRN " + this.schemeRefValue);
  }

  get casesCreated() {
    return this.schemeRefValue;
  }
}
