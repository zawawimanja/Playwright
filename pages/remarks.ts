import { Page } from "@playwright/test";

export class RemarksPage {
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

  get textboxIO() {
    return this.page.locator("#AddRemarksDetailsR").getByRole("textbox");
  }

  get textboxSAO() {
    return this.page.locator("#AddRemarksDetails_Subform_Remarks").getByRole("textbox");
  }

  get textboxSCONTA() {
    return this.page.locator('[id^="subCtrlPreviewRow2-"]').first().getByRole("textbox");
  }

  get textboxSCO() {
    return this.page.locator("#AddRemarksDetails_Subform_Remarks").getByRole("textbox");
  }

  get caseInformationButton() {
    return this.page.getByRole("button", { name: "Remarks" });
  }
  async clickRemarksButton() {
    await this.remarksButton.click();
  }

  async inputRemarks(text) {
    await this.textboxSCONTA.fill(text);
  }
}
