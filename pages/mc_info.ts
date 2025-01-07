import { Page } from "@playwright/test";
export class MedicalCertificatePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Medical Certificate button
   */
  get medicalCertificateButton() {
    return this.page.getByRole("button", { name: "Medical Certificate" });
  }

  get medicalCertificateNTAButton() {
    return this.page.getByText("HUS Information");
  }

  get husInfoButton() {
    return this.page.getByRole("button", { name: "HUS Information" });
  }

  get addRecordButton() {
    return this.page.locator("#ctrlField976").getByRole("button", { name: "Add Record" });
  }

  get husApprovalStatus() {
    return this.page.getByRole("combobox").nth(2);
  }

  get clinicHospitalInput() {
    return this.page.locator(
      'input[type="text"][class*="textInput"][style*="width: 90.49%;"][style*="float: left;"]:not([disabled])'
    );
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
    return this.page.locator("#sectionTabs");
  }

  /**
   * Click on the Medical Certificate button
   */
  async clickMedicalCertificateButton() {
    await this.medicalCertificateButton.click();
  }

  async clickMedicalCertificateNTAButton() {
    await this.medicalCertificateNTAButton.click();
  }

  async clickMCApprovalStatus() {
    await this.page.getByRole("button", { name: "Edit Record" }).click();
    await this.page.getByRole("combobox").nth(2).selectOption("Approved");
    await this.page.getByRole("button", { name: "OK" }).click();
  }

  async clickHusInfoButton() {
    await this.husInfoButton.click();
  }

  submitButton() {
    return this.page.getByRole("button", { name: "OK" });
  }

  get editButton() {
    return this.page.locator('input.ButtonOriginal[value="Edit"]').nth(0);
  }
  clickEditButton() {
    return this.editButton.click();
  }

  async selectHusApprovalStatus() {
    await this.husApprovalStatus.selectOption("Approved");
  }
}
