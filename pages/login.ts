// loginPage.ts

import { Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToLogin() {
        await this.page.goto('http://barista-uat.perkeso.gov.my:13491/login/ActiveDirectory?returnUrl=%2F');
    }

    async setUsername(username: string) {
        await this.page.getByPlaceholder('User Name').fill(username);
    }

    async setPassword(password: string) {
        await this.page.getByPlaceholder('Password').fill(password);
    }

    async clickSignIn() {
        await this.page.getByRole('button', { name: 'Sign In' }).click();
    }

    async login(username: string, password: string) {
        await this.setUsername(username);
        await this.setPassword(password);
        await this.clickSignIn();
    }


}
