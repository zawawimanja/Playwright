import { Page } from "@playwright/test";

export class RecommendationPage {
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

  get recommendationButton() {
    return this.page.getByRole("button", { name: "Recommendation" });
  }

  get SAOrecommendationButton() {
    return this.page.getByRole("button", { name: "SAO Recommendation" });
  }

  get actionRecommend() {
    return this.page.locator("#ActionRecommend");
  }

  get actionRecommendNTA() {
    return this.page.getByLabel("Action*");
  }

  get actionRecommendSCO() {
    return this.page.locator("#ActionSCO");
  }

  get actionRecommendSCOILATS2() {
    return this.page.getByLabel("Action*");
  }

  async clickRecommendationButton() {
    await this.recommendationButton.click();
  }

  async clickSAORecommendationButton() {
    await this.SAOrecommendationButton.click();
  }

  async selectActionOption2() {
    await this.actionRecommendSCO.selectOption("10201");
  }

  async selectActionOptionSCOILATS2() {
    await this.actionRecommendSCOILATS2.selectOption("10201");
  }

  async selectActionRecommend() {
    await this.actionRecommend.selectOption("10207");
  }

  async selectActionRecommendNTA(text) {
    await this.actionRecommendNTA.selectOption(text);
  }

  async selectUnderSectionEmploymentInjury() {
    await this.underSectionEmploymentInjury.first().selectOption("205601");
  }

  get underSectionEmploymentInjury() {
    return this.page.locator('[id^="UnderSectionEmploymentInjury-"]');
  }
}
