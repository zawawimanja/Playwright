// loginPage.ts

import { Page } from '@playwright/test';

export class LeftTabPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;
    }


    async clickPreregistration() {
        await this.page.getByRole('link', { name: 'Pre-Registration', exact: true }).click();
    }


    get preregistrationLink() {
        return this.page.getByRole('link', { name: 'Pre-Registration', exact: true })
    }

    async waitForPreregistrationLink() {
        await this.page.getByRole('link', { name: 'Pre-Registration', exact: true }).waitFor({ state: 'visible' });
    }


    get leftBar() {
        return this.page.locator('.ap-Menu')
    }



    async waitForLeftBar() {

        await this.page.waitForSelector('.ap-Menu', { state: 'visible' });
    }


    get pageBuilderRoot() {

        return this.page.locator('#page-builder-root');
    }







}
