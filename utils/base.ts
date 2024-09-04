// base.ts
import { LoginPage } from '.././pages/login'; // Adjust the import path as needed
import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToLogin();
    await loginPage.login(username, password);
}
