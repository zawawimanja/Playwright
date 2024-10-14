import { Page } from "@playwright/test";
import { CasesPage } from "../pages/cases";

export class MyCasesPage {
  private page: Page;
  private casespage: CasesPage; // Reference to CasesPage

  constructor(page: Page, casespage: CasesPage) {
    this.page = page;
    this.casespage = casespage; // Initialize CasesPage
  }

  get myCasesButton() {
    return this.page.getByRole("link", { name: "My Cases" });
  }

  get frameLocator() {
    return this.page.frameLocator("#baristaPageOut");
  }

  async clickMyCases() {
    await this.frameLocator.getByText("My Cases").click();
  }

  async clickOD() {
    const locator = this.page
      .frameLocator("#baristaPageOut")
      .locator(
        `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Occupational Disease Notice')]`
      );

    // Log the locator to the console
    console.log(`Locator: ${locator}`);

    // Check the number of elements matched
    const count = await locator.count();
    console.log(`Number of matching elements: ${count}`);

    if (count > 0) {
      await locator.click();
    } else {
      console.log("No matching elements found.");
    }
  }

  async clickODSAO() {
    const locator = this.page
      .frameLocator("#baristaPageOut")
      .locator(
        `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Occupation Disease Notice SAO')]`
      );

    // Log the locator to the console
    console.log(`Locator: ${locator}`);

    // Check the number of elements matched
    const count = await locator.count();
    console.log(`Number of matching elements: ${count}`);

    if (count > 0) {
      await locator.click();
    } else {
      console.log("No matching elements found.");
    }
  }

  async clickODMB() {
    const locator = this.page
      .frameLocator("#baristaPageOut")
      .locator(
        `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Medical Board Info')]`
      );

    // Log the locator to the console
    console.log(`Locator: ${locator}`);

    // Check the number of elements matched
    const count = await locator.count();
    console.log(`Number of matching elements: ${count}`);

    if (count > 0) {
      await locator.click();
    } else {
      console.log("No matching elements found.");
    }
  }
}
