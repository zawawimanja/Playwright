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



  get addRecordButton() {
    return this.page.locator('#ctrlField976').getByRole('button', { name: 'Add Record' });
  }

  get clinicHospitalInput() {
    return this.page.locator('input[type="text"][class*="textInput"][style*="width: 90.49%;"][style*="float: left;"]:not([disabled])');
  }

  async addRecord() {
    await this.addRecordButton.click();
  }

  async enterClinicHospitalName(name: string) {
    await this.clinicHospitalInput.click();
    await this.clinicHospitalInput.fill(name);
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

    submitButton() {
        return this.page.getByRole('button', { name: 'OK' });
    }

 
}

