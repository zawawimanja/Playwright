// loginPage.ts

import { Page } from '@playwright/test';

export class DraftPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get closeButton() {
        return this.page.locator('#btnClose');
        //await page1.locator('#btnClose').click();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }


}
