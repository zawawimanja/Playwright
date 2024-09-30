import { Page } from "@playwright/test";

export class CalendarPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get baristaPageOut() {
    return this.page.frameLocator("#baristaPageOut");
  }

  private get uidatepicker() {
    return this.page.locator("#ui-datepicker-div");
  }

  async selectDatePrereg(year: string, month: string, day: string) {
    await this.baristaPageOut.getByRole("combobox").nth(1).selectOption(year);
    //+1
    await this.baristaPageOut.getByRole("combobox").first().selectOption(month);

    await this.page.getByRole("link", { name: day, exact: true }).click();
  }

  private mcDate() {
    return this.page.getByRole("textbox");
  }
  private yearmonthMcDate() {
    return this.page.getByRole("combobox");
  }

  async selectDateInsuredPersonPage(year: string, month: string, day: string) {
    await this.uidatepicker.getByRole("combobox").nth(1).selectOption(year);
    //+1
    await this.uidatepicker.getByRole("combobox").first().selectOption(month);

    await this.page.getByRole("link", { name: day, exact: true }).click();
  }

  get startDateInput() {
    return this.page.locator(
      'div.subCtrlPreviewCtrlHolder[controlholdername="StartDate"] >> nth=1 >> input.datepicker'
    );
  }
  // Locator for the End Date input field
  get endDateInput() {
    return this.page.locator(
      'div.subCtrlPreviewCtrlHolder[controlholdername="EndDateMC"] >> nth=1 >> input.datepicker'
    );
  }

  async selectDateMCEndDate(year: string, month: string, day: string) {
    await this.uidatepicker.getByRole("combobox").nth(1).selectOption(year);
    //+1
    await this.uidatepicker.getByRole("combobox").first().selectOption(month);

    await this.page.getByRole("link", { name: day, exact: true }).click();
  }

  async navigateCalendar(direction: "prev" | "next") {
    await this.baristaPageOut.getByTitle(direction === "prev" ? "Prev" : "Next", { exact: true }).click();
  }
}
