import { Page } from '@playwright/test';


export class CertificationByEmployerPage {


          private page: Page;


    constructor(page: Page) {
    this.page = page;
  }
  /**
   * Certification by Employer button
   */
  get certificationByEmployerButton() {
    return this.page.getByRole('button', { name: 'Certification by Employer' });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator('#sectionTabs');
  }

  /**
   * Name input field
   */
  get nameInput() {
    return this.page.getByLabel('Name*');
  }


   get calendar() {
    return this.page.getByLabel('Date*');
  }

  /**
   * Designation input field
   */
  get designationInput() {
    return this.page.getByLabel('Designation*');
  }

  /**
   * Click on the Certification by Employer button
   */
  async clickCertificationByEmployerButton() {
    await this.certificationByEmployerButton.click();
  }

  /**
   * Fill in the Name input field
   * @param {string} name - The value to fill in the Name input field
   */
  async fillName(name) {
    await this.nameInput.fill(name);
  }

  /**
   * Fill in the Designation input field
   * @param {string} designation - The value to fill in the Designation input field
   */
  async fillDesignation(designation) {
    await this.designationInput.fill(designation);
  }
}

export default CertificationByEmployerPage;