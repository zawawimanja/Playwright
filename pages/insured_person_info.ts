import { Page } from '@playwright/test';

export class InsuredPersonInfoPage {
 private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get insuredPersonInfoButton() {
    return this.page.getByRole('button', { name: 'Insured Person Information' });
  }

    get insuredPersonInfoButtonRPO() {
    return this.page.getByRole('button', { name: 'Insured Person Info' });
  }

  get sectionTabs() {
    return this.page.locator('#sectionTabs');
  }

  get noticeAndBenefitClaimFormReceivedDateInput() {
    return this.page.getByLabel('Notice and Benefit Claim Form Received Date*');
  }

  get occupationInput() {
    return this.page.getByLabel('Occupation(Based on Form 34)*');
  }


  get occupationInputILAT() {
    return this.page.getByLabel('Occupation (Based on Notice');
  }

  getAddressInput(fieldNumber) {
    return this.page.locator(`#AddressInsuredPersonInfo${fieldNumber}`);
  }

    getAddressInputFirst() {
    return this.page.getByLabel('Address*');
  }

   

  getStateSelect() {
    return this.page.getByLabel('State*');
  }

  getCitySelect() {
    return this.page.getByLabel('City*');
  }

  getPostcodeInput() {
    return this.page.getByLabel('Postcode*');
  }

  getNationalitySelect() {
    return this.page.getByLabel('Nationality*');
  }

  async waitForInsuredPersonInfoButton() {
    await this.insuredPersonInfoButton.waitFor({ timeout: 60000 });
  }

  async clickInsuredPersonInfoButton() {
    await this.insuredPersonInfoButton.click();
  }

  async clickInsuredPersonInfoButtonRPO() {
    await this.insuredPersonInfoButtonRPO.click();
  }


  async selectDate(date) {
    await this.page.locator('#ui-datepicker-div').getByRole('combobox').nth(1).selectOption(date);
  }


    getOccupation() {
    return this.page.getByLabel('Occupation', { exact: true })
  }


  


  async fillOccupation(occupation) {
    await this.occupationInput.fill(occupation);
  }

  


  
  getSubOccupation() {
    return this.page.getByLabel('SubOccupation');
  }

  
  getSubOccupationalList() {
    return this.page.getByLabel('Sub Occupational List');
  }


  async selectOccupation(state) {
    await this.getOccupation().selectOption(state);
  }

    async selectSubOccupation(state) {
    await this.getSubOccupation().selectOption(state);
  }

    async selectSubOccupationalList(state) {
    await this.getSubOccupationalList().selectOption(state);
  }

  


   async fillOccupationILAT(occupation) {
    await this.occupationInputILAT.fill(occupation);
  }

  async fillAddress(fieldNumber, value) {
    await this.getAddressInput(fieldNumber).fill(value);
  }

  async fillAddress1(value) {
    await this.getAddressInputFirst().fill(value);
  }

  async selectState(state) {
    await this.getStateSelect().selectOption(state);
  }

  async selectCity(city) {
    await this.getCitySelect().selectOption(city);
  }

  async fillPostcode(postcode) {
    await this.getPostcodeInput().fill(postcode);
  }

  async selectNationality(nationality) {
    await this.getNationalitySelect().selectOption(nationality);
  }
}
