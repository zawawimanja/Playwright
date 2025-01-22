import { Page } from "@playwright/test";

export class MBSessionPage {
  private REMARKS_BUTTON_SELECTOR = '[role="button"][name="Remarks"]';
  private SECTION_TABS_SELECTOR = "#sectionTabs";

  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  get remarksButton() {
    return this.page.locator(this.REMARKS_BUTTON_SELECTOR);
  }

  get sectionTabs() {
    return this.page.locator(this.SECTION_TABS_SELECTOR);
  }

  get addRemarksButton() {
    return this.page.getByRole("button", { name: "Add Remarks" });
  }

  get saveRemarksButton() {
    return this.page.getByRole("button", { name: "Save Remarks" });
  }

  get textbox() {
    return this.page.getByRole("textbox");
  }

  get sessionVenue() {
    return this.page.locator("#ctrlField1020");
  }

  get sessionVenueILAT() {
    return this.page.locator("#ctrlField1040");
  }

  async selectSessionVenue(type) {
    if (type === "OD") {
      await this.sessionVenue.getByRole("combobox").selectOption("708056");
    } else if (type === "ILAT") {
      await this.sessionVenueILAT.getByRole("combobox").selectOption("708056");
    }
  }

  get diseaseSchedule5() {
    return this.page.locator("#ctrlField1022");
  }

  async selectDiseaseSchedule5() {
    await this.diseaseSchedule5.getByRole("combobox").selectOption("Yes");
  }

  get ELS() {
    return this.page.locator("#ctrlField1032");
  }

  async selectELS(string) {
    await this.ELS.getByRole("combobox").selectOption(string);
  }

  get diseaseWork() {
    return this.page.locator("#ctrlField1023");
  }

  async selectDiseaseWork() {
    await this.diseaseWork.getByRole("combobox").selectOption("Yes");
  }

  get mmiAchieved() {
    return this.page.locator("#ctrlField1024");
  }

  async selectmmiAchieved() {
    await this.mmiAchieved.getByRole("combobox").selectOption("Yes");
  }

  get descDisease() {
    return this.page.locator("#ctrlField1025");
  }

  get resultILAT() {
    return this.page.locator('[id^="ILATSF1Result-"]');
  }

  async setResultILat(text) {
    await this.resultILAT.selectOption(text);
  }

  async setdescDis() {
    await this.descDisease.getByRole("textbox").fill("test");
  }

  get remarkRecommendation() {
    return this.page.locator("#ctrlField1034");
  }

  async setremarkRecommendation() {
    await this.remarkRecommendation.getByRole("textbox").fill("test");
  }

  get remark() {
    return this.page.locator("#ctrlField1049");
  }

  async setremark() {
    await this.remark.getByRole("textbox").fill("test");
  }

  get recommendationRehab() {
    return this.page.locator("#ctrlField1033");
  }

  async selectrecommendationRehab() {
    await this.recommendationRehab.getByRole("combobox").selectOption("Yes");
  }

  get assessmentType() {
    return this.page.locator("#ctrlField1026");
  }

  async selectAssessmentType(type) {
    if (type === "Provisional") {
      await this.assessmentType.getByRole("combobox").selectOption("Provisional");
    } else {
      await this.assessmentType.getByRole("combobox").selectOption("Final");
    }
  }

  get sessionAssesment() {
    return this.page.locator("#ctrlField1034");
  }

  get sessionAssesmentAdditionalAssessment() {
    return this.page.locator("#ctrlField1027");
  }

  async setsessionAssesment() {
    await this.sessionAssesment.getByRole("textbox").fill("9");
  }

  async setsessionAssesmentAdditionalAssessment() {
    await this.sessionAssesmentAdditionalAssessment.getByRole("textbox").fill("9");
  }

  get additionalAssesment() {
    return this.page.locator("#ctrlField1028");
  }

  get jdResult() {
    return this.page.locator("#ctrlField1031");
  }

  async selectJDResult() {
    await this.jdResult.getByRole("combobox").selectOption("Yes");
  }
}
