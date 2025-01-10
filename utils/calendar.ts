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

  private mcDate() {
    return this.page.getByRole("textbox");
  }
  private yearmonthMcDate() {
    return this.page.getByRole("combobox");
  }

  async clickDate(type) {
    if (type === "Session Date") {
      await this.page.locator("#ctrlField1021").getByRole("textbox").click();
    } else if (type === "Provisional Date") {
      await this.page.locator("#ctrlField1030").getByRole("textbox").click();
    } else if (type === "Session DateILAT") {
      await this.page.locator("#ctrlField1041").getByRole("textbox").click();
    }
  }

  async selectDateInsuredPersonPage(year: string, month: string, day: string) {
    let monthNumber = parseInt(month, 10) - 1;
    const formattedMonth = monthNumber.toString();
    await this.uidatepicker.getByRole("combobox").nth(1).selectOption(year);
    //+1
    await this.uidatepicker.getByRole("combobox").first().selectOption(formattedMonth);

    await this.page.getByRole("link", { name: day, exact: true }).click();
  }

  async selectDateAccident(year: string, month: string, day: string) {
    await this.baristaPageOut.getByRole("combobox").nth(3).selectOption(year);
    //+1
    await this.baristaPageOut.getByRole("combobox").nth(2).selectOption(month);

    await this.baristaPageOut.getByRole("link", { name: day, exact: true }).click();

    // await this.page.frameLocator("#baristaPageOut").getByRole("combobox").nth(3).selectOption("1999");
    // await this.page.frameLocator("#baristaPageOut").getByRole("combobox").nth(2).selectOption("11");
    // await this.page.frameLocator("#baristaPageOut").getByRole("link", { name: "15" }).click();
  }

  async selectDateMCEndDate(year: string, month: string, day: string) {
    let monthNumber = parseInt(month, 10) - 1;
    const formattedMonth = monthNumber.toString();
    await this.uidatepicker.getByRole("combobox").nth(1).selectOption(year);
    //+1
    await this.uidatepicker.getByRole("combobox").first().selectOption(formattedMonth);

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

  async navigateCalendar(direction: "prev" | "next") {
    await this.baristaPageOut.getByTitle(direction === "prev" ? "Prev" : "Next", { exact: true }).click();
  }
}
