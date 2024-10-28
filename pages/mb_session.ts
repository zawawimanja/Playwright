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

  async selectSessionVenue() {
    await this.sessionVenue.getByRole("combobox").selectOption("708056");
  }

  get diseaseSchedule5() {
    return this.page.locator("#ctrlField1022");
  }

  async selectDiseaseSchedule5() {
    await this.diseaseSchedule5.getByRole("combobox").selectOption("Yes");
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

  async setdescDis() {
    await this.descDisease.getByRole("textbox").fill("test");
  }

  get remarkRecommendation() {
    return this.page.locator("#ctrlField1034");
  }

  async setremarkRecommendation() {
    await this.remarkRecommendation.getByRole("textbox").fill("test");
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

  async setsessionAssesment() {
    await this.sessionAssesment.getByRole("textbox").fill("10");
  }

  get jdResult() {
    return this.page.locator("#ctrlField1031");
  }

  async selectJDResult() {
    await this.jdResult.getByRole("combobox").selectOption("Yes");
  }
}
