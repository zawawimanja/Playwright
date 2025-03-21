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

  get sessionVenueHUK() {
    return this.page.locator("#ctrlField1053");
  }

  async selectSessionVenue(type) {
    if (type === "OD") {
      await this.sessionVenue.getByRole("combobox").selectOption("708056");
    } else if (type === "ILAT") {
      await this.sessionVenueILAT.getByRole("combobox").selectOption("708056");
    } else if (type === "HUK") {
      await this.sessionVenueHUK.getByRole("combobox").selectOption("708056");
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

  get mmiAchievedHUK() {
    return this.page.locator('[id^="HUKSF1MMIAchieved-"]');
  }

  async selectmmiAchieved() {
    await this.mmiAchieved.getByRole("combobox").selectOption("Yes");
  }

  async selectmmiAchievedHUK() {
    await this.mmiAchievedHUK.selectOption("Yes");
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

  async setremark(string) {
    await this.remark.getByRole("textbox").fill(string);
  }

  get recommendationRehab() {
    return this.page.locator("#ctrlField1033");
  }

  get recommendationRehabHUK() {
    return this.page.locator('[id^="HUKSF1RecommendationForRehab"]');
  }

  async selectrecommendationRehab() {
    await this.recommendationRehab.getByRole("combobox").selectOption("Yes");
  }

  get assessmentType() {
    return this.page.locator("#ctrlField1026");
  }

  get assessmentTypeHUK() {
    return this.page.locator('[id^="HUKSF1AssessmentType-"]');
  }

  async selectAssessmentType(type) {
    if (type === "Provisional") {
      await this.assessmentType.getByRole("combobox").selectOption("Provisional");
    } else {
      await this.assessmentType.getByRole("combobox").selectOption("Final");
    }
  }

  async selectAssessmentTypeHUK(type) {
    if (type === "Provisional") {
      await this.assessmentTypeHUK.selectOption("Provisional");
    } else {
      await this.assessmentTypeHUK.selectOption("Final");
    }
  }

  get sessionAssesment() {
    return this.page.locator("#ctrlField1034");
  }

  get sessionAssesmentAdditionalAssessment() {
    return this.page.locator("#ctrlField1027");
  }

  get sessionAssesmentAdditionalAssessmentHUK() {
    return this.page.locator('[id^="HUKSF1SessionAssessment-"]');
  }

  async setsessionAssesment(value) {
    await this.sessionAssesmentAdditionalAssessment.getByRole("textbox").fill(value);
  }

  async setsessionAssesmentHUK(value) {
    await this.sessionAssesmentAdditionalAssessmentHUK.fill(value);
  }

  get additionalAssesment() {
    return this.page.locator("#ctrlField1028");
  }

  get jdResult() {
    return this.page.locator("#ctrlField1031");
  }

  async selectJDResult(string) {
    await this.jdResult.getByRole("combobox").selectOption(string);
  }
}
