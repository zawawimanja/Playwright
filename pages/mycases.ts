import { Locator, Page } from '@playwright/test';
import { CasesPage } from '../pages/cases';

export class MyCasesPage {
  private page: Page;
  private casespage: CasesPage; // Reference to CasesPage

  constructor(page: Page, casespage: CasesPage) {
    this.page = page;
    this.casespage = casespage; // Initialize CasesPage
  }

  get myCasesButton() {
    return this.page.getByRole('link', { name: 'My Cases' });
  }

  get frameLocator() {
    return this.page.frameLocator('#baristaPageOut');
  }

  async clickAccident(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case 'SCO':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Accident Notice SCO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'HUK SCO':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'HUK SCO')]`,
          );
        console.log(`Locator: ${locator}`);
        break;

      case 'HUK SAO':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'HUK SAO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'SAO':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Accident Notice SAO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'MB':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Medical Board Info)]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'HUK MB':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'HUK MB')]`,
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log('Invalid type provided.');
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log('Case found and clicked.');
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log('No matching elements found or failed to click.');
      return false; // Return false if element was not found or click failed
    }
  }

  async clickDeath(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case 'SCO':
        locator = this.page
          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Death Notice SCO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'SAO':
        locator = this.page
          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Death Notice SAO')]`,
          );
        console.log(`Locator: ${locator}`);
        break;

      case 'MB':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Medical Board Info')]`,
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log('Invalid type provided.');
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log('Case found and clicked.');
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log('No matching elements found or failed to click.');
      return false; // Return false if element was not found or click failed
    }
  }

  async clickS2Case(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case 'SCO':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Death Notice SCO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'SAO RPO':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Revision Payment Option SAO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'MB':
        locator = this.page
          .frameLocator('#baristaPageOut')
          .frameLocator('#APWorkCenter')

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Medical Board Info')]`,
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log('Invalid type provided.');
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log('Case found and clicked.');
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log('No matching elements found or failed to click.');
      return false; // Return false if element was not found or click failed
    }
  }

  async clickOD(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case 'OD':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Occupational Disease Notice')]`,
          );
        console.log(`Locator: ${locator}`);
        break;

      case 'SAO':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Occupation Disease Notice SAO')]`,
          );
        console.log(`Locator: ${locator}`);
        break;

      case 'MB':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Medical Board Info')]`,
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log('Invalid type provided.');
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log('Case found and clicked.');
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log('No matching elements found or failed to click.');
      return false; // Return false if element was not found or click failed
    }
  }

  async clickILAT(type: string): Promise<boolean> {
    let locator;

    // Choose the locator based on the type
    switch (type) {
      case 'SCO':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'SCO IO Form')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'SAO':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'AO Form')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'SAOS1':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Invalidity Notice SAO')]`,
          );

        console.log(`Locator: ${locator}`);
        break;

      case 'MB':
        locator = this.page

          .locator('#baristaPageOut')
          .contentFrame()
          .locator('#APWorkCenter')
          .contentFrame()

          .locator(
            `//tr[td[a[contains(text(), '${this.casespage.casesCreated}')]]]/td[contains(@title, 'Medical Board')]`,
          );

        console.log(`Locator: ${locator}`);
        break;
      default:
        console.log('Invalid type provided.');
        return false; // Return false if the type is invalid
    }

    // Log the locator to the console

    try {
      await locator.click({ timeout: 30000 }); // Attempt to click with a timeout
      console.log('Case found and clicked.');
      return true; // Return true if element was found and clicked
    } catch (error) {
      console.log('No matching elements found or failed to click.');
      return false; // Return false if element was not found or click failed
    }
  }
}
function expect(arg0: Locator) {
  throw new Error('Function not implemented.');
}
