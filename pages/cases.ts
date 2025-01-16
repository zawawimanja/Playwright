// filepath: /c:/Users/aaror/Downloads/Playwright/pages/cases.ts
import { Page } from "@playwright/test";
import { SubmitPage } from "../pages/submit";
import * as fs from "fs";
import * as path from "path";

export class CasesPage {
  private page: Page;
  private submitPage: SubmitPage;
  private schemeRefValue: string;

  constructor(page: Page, submitPage: SubmitPage) {
    this.page = page;
    this.submitPage = submitPage;
  }

  async init() {
    const filePath = path.join(__dirname, "schemeRefValue.json");
    while (!fs.existsSync(filePath)) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
    const fileContent = await fs.promises.readFile(filePath, "utf8");
    const schemeRefValue = JSON.parse(fileContent).schemeRefValue;
    this.schemeRefValue = schemeRefValue;
    console.log(" SRN " + this.schemeRefValue);
  }
  get casesCreated() {
    return this.schemeRefValue;
  }

  get frameLocator() {
    return this.page.frameLocator("#baristaPageOut");
  }
}
