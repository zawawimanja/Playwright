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

  get actionRecommendSCO() {
    return this.page.locator("#ActionSCO");
  }

  async clickRecommendationButton() {
    await this.recommendationButton.click();
  }

  async clickSAORecommendationButton() {
    await this.SAOrecommendationButton.click();
  }

  async selectActionOption() {
    await this.actionRecommend.selectOption("10207");
  }

  async selectActionOptionSCO() {
    await this.actionRecommendSCO.selectOption("10201");
  }
}
