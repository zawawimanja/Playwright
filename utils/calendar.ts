import { Page } from '@playwright/test';


export class CalendarPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;

    }


    private get baristaPageOut() {
        return this.page.frameLocator('#baristaPageOut');
    }


    private get uidatepicker() {
        return this.page.locator('#ui-datepicker-div');
    }

    async selectDatePreregPage(year: string, month: string, day: string) {

        await this.baristaPageOut.getByRole('combobox').nth(3).selectOption(year);
        await this.baristaPageOut.getByRole('combobox').nth(2).selectOption(month);

        await this.baristaPageOut.getByRole('cell', { name: day, exact: true }).click();

    }

    async selectDateInsuredPersonPage(year: string, month: string, day: string) {

        await this.uidatepicker.getByRole('combobox').nth(1).selectOption(year);
        //+1
        await this.uidatepicker.getByRole('combobox').first().selectOption(month);

        await this.page.getByRole('link', { name: day, exact: true }).click();


    }


    async selectDateCertEmployerPage(year: string, month: string, day: string) {


        await this.page.getByRole('combobox').nth(1).selectOption(year);
        await this.page.getByRole('combobox').first().selectOption(month);
        await this.page.getByRole('link', { name: day, exact: true }).click();

    }















    async navigateCalendar(direction: 'prev' | 'next') {
        await this.baristaPageOut.getByTitle(direction === 'prev' ? 'Prev' : 'Next', { exact: true }).click();

    }


}
