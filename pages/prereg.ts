// loginPage.ts

import { Page } from '@playwright/test';

export class PreregistrationPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get baristaPageOut() {
        return this.page.frameLocator('#baristaPageOut');
    }

    private get preRegistrationHeading() {
        return this.baristaPageOut.locator('h2');
    }

    private get searchInsuredPersonHeading() {
        return this.baristaPageOut.getByRole('heading', { name: 'Search Insured Person &' });
    }

    private get searchInsuredPersonEmployerRegistrationStatusHeading() {
        return this.baristaPageOut.locator('#Heading31');
    }

    private get noticeTypePreRegSelect() {
        return this.baristaPageOut.locator('#NoticeTypePreReg');
    }

    private get noticeAndBenefitClaimFormSelect() {
        return this.baristaPageOut.getByLabel('Notice and Benefit Claim Form');
    }

    private get identificationNoInput() {
        return this.baristaPageOut.getByLabel('Identification No.*');
    }

    private get employerCodeInput() {
        return this.baristaPageOut.getByLabel('Employer Code*');
    }

    private get claimFormSubmissionByListButton() {
        return this.baristaPageOut.locator('#previewRow6 div').filter({ hasText: 'ClaimFormSubmissionByList' }).first();
    }

    private get searchButton() {
        return this.baristaPageOut.getByRole('button', { name: 'Search' });
    }

    private get nextButton() {
        return this.baristaPageOut.getByRole('button', { name: 'Next' });
    }

    async selectNoticeTypePreRegOption(option: string) {
        await this.noticeTypePreRegSelect.selectOption(option);
    }

    async selectNoticeAndBenefitClaimFormOption(option: string) {
        await this.noticeAndBenefitClaimFormSelect.selectOption(option);
    }

    async fillIdentificationNo(input: string) {
        await this.identificationNoInput.fill(input);
    }

    async fillEmployerCode(input: string) {
        await this.employerCodeInput.fill(input);
    }

    async clickClaimFormSubmissionByListButton() {
        await this.claimFormSubmissionByListButton.click();
    }

    async clickSearchButton() {
        await this.searchButton.click();
    }

    async clickNextButton() {
        await this.nextButton.click();
    }

















}
