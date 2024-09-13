import { Page } from '@playwright/test';

export class RemarksPage {
  private REMARKS_BUTTON_SELECTOR = '[role="button"][name="Remarks"]';
  private SECTION_TABS_SELECTOR = '#sectionTabs';
  private ADD_REMARKS_BUTTON_SELECTOR = '[role="button"][name="Add Remarks"]';
  private SAVE_REMARKS_BUTTON_SELECTOR = '[role="button"][name="Save Remarks"]';
  private TEXTBOX_SELECTOR = '[role="textbox"]';
  private TIMEOUT = 60000;
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
    return this.page.getByRole('button', { name: 'Add Remarks' });
  }

  get saveRemarksButton() {
    return this.page.getByRole('button', { name: 'Save Remarks' });
  }

  get textbox() {
    return this.page.getByRole('textbox');
  }
}