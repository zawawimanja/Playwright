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

  async clickAccident(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case "SCO":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Accident Notice SCO')]`
          );
        console.log(`Locator: ${locator}`);
        break;

      case "SAO":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Accident Notice SAO')]`
          );
        console.log(`Locator: ${locator}`);
        break;

      case "MB":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Medical Board Info')]`
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log("Invalid type provided.");
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log("Case found and clicked.");
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log("No matching elements found or failed to click.");
      return false; // Return false if element was not found or click failed
    }
  }

  async clickOD(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case "OD":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Occupational Disease Notice')]`
          );
        console.log(`Locator: ${locator}`);
        break;

      case "SAO":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Occupation Disease Notice SAO')]`
          );
        console.log(`Locator: ${locator}`);
        break;

      case "MB":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Medical Board Info')]`
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log("Invalid type provided.");
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log("Case found and clicked.");
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log("No matching elements found or failed to click.");
      return false; // Return false if element was not found or click failed
    }
  }

  async clickILAT(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case "SCO":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'SCO IO Form')]`
          );
        console.log(`Locator: ${locator}`);
        break;

      case "SAO":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'SAO Form')]`
          );

        console.log(`Locator: ${locator}`);
        break;

      case "SAOS1":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Invalidity Notice SAO')]`
          );

        console.log(`Locator: ${locator}`);
        break;

      case "MB":
        locator = this.page
          .frameLocator("#baristaPageOut")
          .frameLocator("#APWorkCenter")
          .locator(
            `//td[a[contains(text(), '${this.casespage.casesCreated}')]]/following-sibling::td[contains(@title, 'Invalidity Notice Process')]`
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log("Invalid type provided.");
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log("Case found and clicked.");
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log("No matching elements found or failed to click.");
      return false; // Return false if element was not found or click failed
    }
  }
}
