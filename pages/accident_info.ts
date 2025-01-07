import { Page } from "@playwright/test";
import { isNumberObject } from "util/types";

export class AccidentInformationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Occupational Disease button
   */

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  /**
   * Description of Occupational input field
   */
  get descriptionOfOccupationalInput() {
    return this.page.getByLabel("Description of Occupational");
  }

  get accidentHappened() {
    return this.page.getByLabel("How did the Accident Happened");
  }

  get injuryDescription() {
    return this.page.getByLabel("Injury Description*");
  }

  get diseaseRelatedEmployment() {
    return this.page.getByLabel("Is the disease related to");
  }

  get acciddentInformationButton() {
    return this.page.getByRole("button", { name: "Accident Information" });
  }

  async selectDiseaseRelatedEMploymentOption(option: string) {
    await this.diseaseRelatedEmployment.selectOption(option);
  }

  /**
   * Specify duties and how input field
   */
  get specifyDutiesAndHowInput() {
    return this.page.getByLabel("Specify duties and how");
  }

  /**
   * Please explain symptoms / input field
   */
  get pleaseExplainSymptomsInput() {
    return this.page.getByLabel("Please explain symptoms /");
  }

  /**
   * Click on the Occupational Disease button
   */
  async clickAccidentInformationButton() {
    await this.acciddentInformationButton.click();
  }

  async selectCausativeAgentOption() {
    await this.page.getByLabel("Causative Agent - Prevention*").selectOption("10401");
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
  async fillAccidentHappened(text) {
    await this.accidentHappened.fill(text);
  }

  async fillAccidentInjury(text) {
    await this.injuryDescription.fill(text);
  }

  get modeOfTransport() {
    return this.page.getByLabel("Mode of Transport*");
  }

  get causeofAccident() {
    return this.page.getByLabel("Cause of Accident*");
  }

  async selectModeOfTransport(text) {
    await this.modeOfTransport.selectOption(text);
  }

  async selectCauseofAccident(text) {
    await this.causeofAccident.selectOption(text);
  }
}
