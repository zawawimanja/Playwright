import { Page } from "@playwright/test";

export class PreviewSubmissionPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Preview & Submission button
   */
  get previewSubmissionButton() {
    return this.page.getByRole("button", { name: "Preview & Submission" });
  }

  /**
   * Click on the Preview & Submission button
   */
  async clickPreviewSubmissionButton() {
    await this.previewSubmissionButton.click();
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  get formPreviewSite() {
    return this.page.locator("#formPreviewSite");
  }

  /**
   * Show Preview button
   */
  get showPreviewButton() {
    return this.page.getByRole("button", { name: "Show Preview" });
  }

  /**
   * Loading indicator element
   */
  get loadingIndicator() {
    return this.page.getByLabel("loading");
  }

  /**
   * Submit button
   */
  get submitButton() {
    return this.formPreviewSite.getByRole("button", { name: "Submit" });
  }

  /**
   * Yes button
   */
  get yesButton() {
    return this.page.getByRole("button", { name: "Yes" });
  }

  /**
   * Click on the Show Preview button
   */
  async clickShowPreviewButton() {
    await this.showPreviewButton.click();
  }

  /**
   * Check if the loading indicator is visible
   */

  /**
   * Click on the Submit button
   */
  async clickSubmitButton() {
    await this.submitButton.click();
  }

  /**
   * Click on the Yes button
   */
  async clickYesButton() {
    await this.yesButton.click();
  }

  /**
   * Navigate to the eFormRender page
   */
  async navigateToEFormRenderPage() {
    await this.page.goto(
      "http://barista-sandbox.perkeso.gov.my:13491/ApplicationBuilder/eFormRender.html?WID=8F6200505680B7F611FF81FA610B2BC0"
    );
  }

  /**
   * Check if the Scheme Ref No. label is visible
   */
}
