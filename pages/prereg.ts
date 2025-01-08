// loginPage.ts

import { Page } from "@playwright/test";

export class PreregistrationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get baristaPageOut() {
    return this.page.frameLocator("#baristaPageOut");
  }

  private get workbasket() {
    return this.page.frameLocator("#workbasket");
  }

  private get preRegistrationHeading() {
    return this.baristaPageOut.locator("h2");
  }

  private get searchInsuredPersonHeading() {
    return this.baristaPageOut.getByRole("heading", { name: "Search Insured Person &" });
  }

  private get searchInsuredPersonEmployerRegistrationStatusHeading() {
    return this.baristaPageOut.locator("#Heading31");
  }

  private get noticeTypePreRegSelect() {
    return this.baristaPageOut.locator("#NoticeTypePreReg");
  }

  private get noticeAndBenefitClaimFormSelect() {
    return this.baristaPageOut.getByLabel("Notice and Benefit Claim Form");
  }

  private get identificationNoInput() {
    return this.baristaPageOut.getByLabel("Identification No.*");
  }

  private get employerCodeInput() {
    return this.baristaPageOut.getByLabel("Employer Code*");
  }

  private get accidentDate() {
    return this.baristaPageOut.getByLabel("Accident Date*").click();
  }

  private get claimFormSubmissionByListButton() {
    return this.baristaPageOut.locator("#previewRow6 div").filter({ hasText: "ClaimFormSubmissionByList" }).first();
  }

  private get searchButton() {
    return this.baristaPageOut.getByRole("button", { name: "Search" });
  }

  private get createRevisionButton() {
    return this.baristaPageOut.getByRole("button", { name: "Create Revision" });
  }

  private get nextButton() {
    return this.baristaPageOut.getByRole("button", { name: "Next" });
  }

  async selectNoticeTypePreRegOption(option: string) {
    await this.noticeTypePreRegSelect.selectOption(option);
  }

  public async getSelectedInsuredPersonEmploymentText(): Promise<string> {
    return await this.insuredPersonEmployment.locator("option:checked").innerText();
  }

  public async getSelectedIdentificationTypeText(): Promise<string> {
    return await this.identificationTypeLabel.locator("option:checked").innerText();
  }

  public async getIdentificationNo(): Promise<string> {
    return await this.identificationNoInput.inputValue();
  }

  public async getEmployerCode(): Promise<string> {
    return await this.employerCodeInput.inputValue();
  }

  // Public method to get the selected option text
  public async getSelectedNoticeTypeText(): Promise<string> {
    return await this.noticeTypePreRegSelect.locator("option:checked").innerText();
  }

  async selectNoticeAndBenefitClaimFormOption(option: string) {
    await this.noticeAndBenefitClaimFormSelect.selectOption(option);
  }

  public async getselectNoticeAndBenefitClaimFormText(): Promise<string> {
    return await this.noticeAndBenefitClaimFormSelect.locator("option:checked").innerText();
  }

  async fillIdentificationNo(input: string) {
    await this.identificationNoInput.fill(input);
  }

  async fillEmployerCode(input: string) {
    await this.employerCodeInput.fill(input);
  }

  async clickClaimFormSubmissionByListButton() {
    await this.claimFormSubmissionByListButton.click();
  }

  async clickSearchButton() {
    await this.searchButton.click();
  }

  async clickCreateRevisionButton() {
    await this.createRevisionButton.click();
  }

  async clickNextButton() {
    await this.nextButton.click();
  }

  get accidentDateFrame() {
    return this.page.frameLocator("#baristaPageOut");
  }

  get accidentDateLabel() {
    return this.accidentDateFrame.getByLabel("Accident Date*");
  }

  get accidentDateComboBox() {
    return this.accidentDateFrame.getByRole("combobox").nth(3);
  }

  get accidentTimeLabel() {
    return this.accidentDateFrame.getByLabel("Accident Time*");
  }

  get accidentTimeComboBox() {
    return this.accidentDateFrame.getByRole("combobox").nth(2);
  }

  get identificationTypeLabel() {
    return this.baristaPageOut.getByLabel("Identification Type*");
  }

  get insuredPersonEmployment() {
    return this.accidentDateFrame.getByLabel("Does Insured Person Still in");
  }

  get identificationTypeComboBox() {
    return this.accidentDateFrame.getByRole("combobox").nth(1);
  }

  get identificationNoLabel() {
    return this.accidentDateFrame.getByLabel("Identification No.*");
  }

  get identificationNoTextField() {
    return this.accidentDateFrame.getByLabel("Identification No.*");
  }

  async selectAccidentDate(date) {
    await this.accidentDateComboBox.selectOption(date);
  }

  async selectAccidentTime(time) {
    await this.accidentTimeComboBox.selectOption(time);
  }

  async selectIdentificationType(type) {
    await this.identificationTypeLabel.selectOption(type);
  }

  async selectInsuredPersonEmployment(type) {
    await this.insuredPersonEmployment.selectOption(type);
  }

  async fillAccidentDate(): Promise<void> {
    await this.workbasket.getByLabel("Accident Date*").click();
    await this.workbasket.getByRole("combobox").nth(3).selectOption("2020");
  }

  async fillAccidentTime(): Promise<void> {
    await this.workbasket.getByLabel("Accident Time*").click();
    await this.baristaPageOut.getByLabel("Accident Time*").click();
    await this.baristaPageOut
      .locator("dd")
      .filter({ hasText: "12 am01 am02 am03 am04 am05" })
      .getByRole("combobox")
      .selectOption("15");
  }

  async clickLink1() {
    await this.workbasket.getByRole("link", { name: "1", exact: true }).click();
  }

  private get revisionTypeLocator() {
    return this.baristaPageOut.locator("#RevisionType");
  }

  private get searchByLocator() {
    return this.baristaPageOut.getByLabel("Search By");
  }

  private get schemeRefNoLocator() {
    return this.baristaPageOut.getByLabel("Scheme Reference Number");
  }

  private get identificationTypeLocator() {
    return this.baristaPageOut.locator("#IdentificationType");
  }

  private get identificationNoLocator() {
    return this.baristaPageOut.getByLabel("Identification No.");
  }

  private get searchButtonLocator() {
    return this.baristaPageOut.getByRole("button", { name: "Search" });
  }

  async selectRevisionType(option: string) {
    await this.revisionTypeLocator.selectOption(option);
  }

  async setSearchByOption(option: string) {
    await this.searchByLocator.selectOption(option);
  }

  async enterSchemeRefNo(value: string) {
    await this.schemeRefNoLocator.fill(value);
  }

  async enterIdentificationType(value: string) {
    await this.identificationTypeLocator.fill(value);
  }

  async enterIdentificationNo(value: string) {
    await this.identificationNoLocator.fill(value);
  }
}
