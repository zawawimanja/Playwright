import { Page } from '@playwright/test';
export class MedicalCertificatePage {

    private page: Page;


    constructor(page: Page) {
    this.page = page;
  }
  /**
   * Medical Certificate button
   */
  get medicalCertificateButton() {
    return this.page.getByRole('button', { name: 'Medical Certificate' });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator('#sectionTabs');
  }

  /**
   * Click on the Medical Certificate button
   */
  async clickMedicalCertificateButton() {
    await this.medicalCertificateButton.click();
  }
}

