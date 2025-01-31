import { Page } from "@playwright/test";
import * as fs from "fs";
import * as path from "path";

export class SRNPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get textboxIO() {
    return this.page.locator("#AddRemarksDetailsR").getByRole("textbox");
  }

  async saveSchemeRefValue() {
    // Wait for the element to be present
    await this.page.getByLabel("Scheme Ref No:").waitFor();

    const schemeRefValue = await this.page.getByLabel("Scheme Ref No:").inputValue();
    console.log("SRN from locator: " + schemeRefValue);
    const filePath = path.resolve(__dirname, "schemeRefValue.json");
    fs.writeFileSync(filePath, JSON.stringify({ schemeRefValue }));

    // Check if the file exists
    if (fs.existsSync(filePath)) {
      console.log("File schemeRefValue.json exists at path: " + filePath);
    } else {
      console.log("File schemeRefValue.json does not exist at path: " + filePath);
    }
  }
}
