import { Page } from '@playwright/test';

export class EmployerInfoPage {

private page: Page;

    constructor(page: Page) {
    this.page = page;
  }
  /**
   * Employer Information button
   */
  get employerInfoButton() {
    return this.page.getByRole('button', { name: 'Employer Information' });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator('#sectionTabs');
  }

  /**
   * Click on the Employer Information button
   */
  async clickEmployerInfoButton() {
    await this.employerInfoButton.click();
  }

  /**
   * Verify the Employer Information button is visible
   */

  /**
   * Verify the section tabs contain the text 'Employer Information'
   */

}


export default EmployerInfoPage;