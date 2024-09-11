// loginPage.ts

import { Page } from '@playwright/test';

export class PreregistrationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }


    async selectNoticeType(username: string) {

        await this.page.frameLocator('#baristaPageOut').locator('#NoticeTypePreReg').selectOption(username);
    }

    async selectDoesInsuredPersonStillinEmployment(username: string) {
        await this.page.getByPlaceholder('User Name').fill(username);
    }

    async selectNoticeandBenefitClaimFormSubmissionby(username: string) {
        await this.page.getByPlaceholder('User Name').fill(username);
    }

    async selectIdentificationType(username: string) {
        await this.page.getByPlaceholder('User Name').fill(username);
    }

    async setIdentificationNo(username: string) {
        await this.page.getByPlaceholder('User Name').fill(username);
    }

    async setEmployerCode(password: string) {
        await this.page.getByPlaceholder('Password').fill(password);
    }

    async clickSearch() {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }




}
