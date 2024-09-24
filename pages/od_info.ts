import { Page } from '@playwright/test';

export class OccupationalDiseasePage {

private page: Page;


    constructor(page: Page) {
    this.page = page;
  }

  /**
   * Occupational Disease button
   */
  get occupationalDiseaseButton() {
    return this.page.getByRole('button', { name: 'Occupational Disease' });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator('#sectionTabs');
  }

  /**
   * Description of Occupational input field
   */
  get descriptionOfOccupationalInput() {
    return this.page.getByLabel('Description of Occupational');
  }


 get diseaseRelatedEmployment() {
    return this.page.getByLabel('Is the disease related to');
  }


    async selectDiseaseRelatedEMploymentOption(option: string) {
    await this.diseaseRelatedEmployment.selectOption(option);
  }




  /**
   * Specify duties and how input field
   */
  get specifyDutiesAndHowInput() {
    return this.page.getByLabel('Specify duties and how');
  }

  /**
   * Please explain symptoms / input field
   */
  get pleaseExplainSymptomsInput() {
    return this.page.getByLabel('Please explain symptoms /');
  }

  /**
   * Click on the Occupational Disease button
   */
  async clickOccupationalDiseaseButton() {
    await this.occupationalDiseaseButton.click();
  }

  /**
   * Fill the Description of Occupational input field
   * @param {string} text - text to fill
   */
  async fillDescriptionOfOccupational(text) {
    await this.descriptionOfOccupationalInput.click();
    await this.descriptionOfOccupationalInput.fill(text);
  }

  /**
   * Fill the Specify duties and how input field
   * @param {string} text - text to fill
   */
  async fillSpecifyDutiesAndHow(text) {
    await this.specifyDutiesAndHowInput.click();
    await this.specifyDutiesAndHowInput.fill(text);
  }

  /**
   * Fill the Please explain symptoms / input field
   * @param {string} text - text to fill
   */
  async fillPleaseExplainSymptoms(text) {
    await this.pleaseExplainSymptomsInput.click();
    await this.pleaseExplainSymptomsInput.fill(text);
  }
}

export default OccupationalDiseasePage;