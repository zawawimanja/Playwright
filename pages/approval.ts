import { Page } from "@playwright/test";

export class ApprovalPage {
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

  get approvalButton() {
    return this.page.getByRole("button", { name: "Approval" });
  }

  get actionRecommend() {
    return this.page.locator("#ActionRecommend");
  }

  get actionApprove() {
    return this.page.locator("#ActionApprove");
  }

  get actionApproveAfterMB() {
    return this.page.locator("#ActionApprovalAfterMB");
  }

  async selectSAOActionOptionAfterMB() {
    await this.actionApproveAfterMB.selectOption("10203");
  }

  async clickRecommendationButton() {
    await this.recommendationButton.click();
  }

  async clickApprovalButton() {
    await this.approvalButton.click();
  }

  async selectActionOption() {
    await this.actionRecommend.selectOption("10207");
  }

  async selectSAOActionOption() {
    await this.actionApprove.selectOption("10207");
  }
}
