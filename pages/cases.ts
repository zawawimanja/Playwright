import { Page } from "@playwright/test";
import { SubmitPage } from "../pages/submit"; // Ensure this path is correct
import * as fs from "fs";
import * as path from "path";

export class CasesPage {
  private page: Page;
  private submitPage: SubmitPage;
  private schemeRefValue: string | null = null; // Initialize as null

  constructor(page: Page, submitPage: SubmitPage) {
    this.page = page;
    this.submitPage = submitPage;
  }

  async init() {
    // Use the absolute path to the JSON file
    const filePath = "C:\\Users\\aaror\\Downloads\\Playwright\\e2e\\Prereg\\S2 - ILAT-BI2PI\\schemeRefValue.json";

    // Check if the file exists before trying to read it
    if (fs.existsSync(filePath)) {
      try {
        // Read the JSON file
        const fileContent = await fs.promises.readFile(filePath, "utf8");
        const parsedContent = JSON.parse(fileContent);

        // Assign the value to schemeRefValue
        this.schemeRefValue = parsedContent.schemeRefValue || null; // Use null if not found
        console.log("Read SRN from JSON file: " + this.schemeRefValue);
      } catch (error) {
        console.error("Error reading or parsing schemeRefValue.json:", error);
      }
    } else {
      console.log("File schemeRefValue.json does not exist at path: " + filePath);
    }
  }

  get casesCreated() {
    return this.schemeRefValue;
  }

  get frameLocator() {
    return this.page.frameLocator("#baristaPageOut");
  }
}
