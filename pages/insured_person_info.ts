import { Page } from "@playwright/test";

export class InsuredPersonInfoPage {
  private page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  get insuredPersonInfoButton() {
    return this.page.getByRole("button", { name: "Insured Person Information" });
  }

  get insuredPersonInfoButtonRPO() {
    return this.page.getByRole("button", { name: "Insured Person Info" });
  }

  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  get noticeAndBenefitClaimFormReceivedDateInput() {
    return this.page.getByLabel("Notice and Benefit Claim Form Received Date*");
  }

  get occupationInput() {
    return this.page.getByLabel("Occupation(Based on Form 34)*");
  }

  get occupationInputPKT() {
    return this.page.getByLabel("Occupation (Based on Form 34)*");
  }

  get occupationInputILAT() {
    return this.page.getByLabel("Occupation (Based on Notice");
  }

  getAddressInput(fieldNumber) {
    return this.page.locator(`#AddressInsuredPersonInfo${fieldNumber}`);
  }

  get AddressInputFirst() {
    return this.page.getByLabel("Address*");
  }

  get StateSelect() {
    return this.page.getByLabel("State*");
  }
  get CitySelect() {
    return this.page.getByLabel("City*");
  }

  get PostcodeInput() {
    return this.page.getByLabel("Postcode*");
  }

  get NationalitySelect() {
    return this.page.getByLabel("Nationality*");
  }

  async selectNationalityILAT() {
    await this.page.locator("#ctrlField590 span").nth(3).click();
    await this.page.getByRole("option", { name: "Malaysia" }).click();
  }

  async clickInsuredPersonInfoButton() {
    await this.insuredPersonInfoButton.click();
  }

  async clickInsuredPersonInfoButtonRPO() {
    await this.insuredPersonInfoButtonRPO.click();
  }

  async selectDate(date) {
    await this.page.locator("#ui-datepicker-div").getByRole("combobox").nth(1).selectOption(date);
  }

  getOccupation() {
    return this.page.getByLabel("Occupation", { exact: true });
  }

  async fillOccupation(occupation) {
    await this.occupationInput.fill(occupation);
  }

  async fillOccupationPKT(occupation) {
    await this.occupationInputPKT.fill(occupation);
  }

  async fillOccupationILAT(occupation) {
    await this.occupationInputILAT.fill(occupation);
  }

  getSubOccupation() {
    return this.page.getByLabel("SubOccupation");
  }

  getSubOccupationalList() {
    return this.page.getByLabel("Sub Occupational List");
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

  async fillAddress(fieldNumber, value) {
    await this.getAddressInput(fieldNumber).fill(value);
  }

  async fillAddress1(value) {
    await this.AddressInputFirst.fill(value);
  }

  async selectState(state) {
    await this.StateSelect.selectOption(state);
  }

  async selectCity(city) {
    await this.CitySelect.selectOption(city);
  }

  async fillPostcode(postcode) {
    await this.PostcodeInput.fill(postcode);
  }

  async selectNationality(nationality) {
    await this.NationalitySelect.selectOption(nationality);
  }
}
