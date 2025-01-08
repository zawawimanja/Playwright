import { Page } from "@playwright/test";

export class BankInformationPage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }
  /**
   * Bank Information button
   */
  get bankInformationButton() {
    return this.page.getByRole("button", { name: "Bank Information" });
  }

  /**
   * Section tabs element
   */
  get sectionTabs() {
    return this.page.locator("#sectionTabs");
  }

  /**
   * Account No. label element
   */
  get accountNoLabel() {
    return this.page.getByText("Account No.", { exact: true });
  }

  /**
   * Account No. select element
   */
  get accountNoSelect() {
    return this.page.getByLabel("Account No.*", { exact: true });
  }

  /**
   * Bank Location select element
   */
  get bankLocationSelect() {
    return this.page.getByLabel("Bank Location*");
  }

  /**
   * Bank Name label element
   */
  get bankNameLabel() {
    return this.page.locator("#ctrlField1521").getByText("Bank Name");
  }

  /**
   * Bank Name select element
   */
  get bankNameSelect() {
    return this.page.locator("#BankNameLB");
  }

  get bankNameSelectILAT() {
    return this.page.locator("#BankNameLocalBank");
  }

  get bankNameSelectAccident() {
    return this.page.locator("#BankNameLocalBank");
  }

  /**
   * Bank Swift Code label element
   */
  get bankSwiftCodeLabel() {
    return this.page.locator("#ctrlField1041").getByText("Bank Swift Code");
  }

  /**
   * Bank Account Type label element
   */
  get bankAccountTypeLabel() {
    return this.page.getByText("Bank Account Type");
  }

  /**
   * Bank Account Type select element
   */
  get bankAccountTypeSelect() {
    return this.page.getByLabel("Bank Account Type*");
  }

  /**
   * Bank Branch label element
   */
  get bankBranchLabel() {
    return this.page.getByText("Bank Branch");
  }

  /**
   * Bank Branch input field
   */
  get bankBranchInput() {
    return this.page.getByLabel("Bank Branch*");
  }

  /**
   * Bank Account No. input field
   */
  get bankAccountNoInput() {
    return this.page.getByLabel("Bank Account No.*");
  }

  /**
   * Click on the Bank Information button
   */
  async clickBankInformationButton() {
    await this.bankInformationButton.click();
  }

  /**
   * Select an option from the Account No. select element
   * @param {string} option - The value of the option to select
   */
  async selectAccountNo(option) {
    await this.accountNoSelect.selectOption(option);
  }

  /**
   * Select an option from the Bank Location select element
   * @param {string} option - The value of the option to select
   */
  async selectBankLocation(option) {
    await this.bankLocationSelect.selectOption(option);
  }

  /**
   * Select an option from the Bank Name select element
   * @param {string} option - The value of the option to select
   */
  async selectBankName(option) {
    await this.bankNameSelect.selectOption(option);
  }

  async selectBankNameILAT(option) {
    await this.bankNameSelectILAT.selectOption(option);
  }

  async selectBankNameAccident(option) {
    await this.bankNameSelectAccident.selectOption(option);
  }

  /**
   * Select an option from the Bank Account Type select element
   * @param {string} option - The value of the option to select
   */
  async selectBankAccountType(option) {
    await this.bankAccountTypeSelect.selectOption(option);
  }

  /**
   * Fill in the Bank Branch input field
   * @param {string} branch - The value to fill in the Bank Branch input field
   */
  async fillBankBranch(branch) {
    await this.bankBranchInput.fill(branch);
  }

  /**
   * Fill in the Bank Account No. input field
   * @param {string} accountNo - The value to fill in the Bank Account No. input field
   */
  async fillBankAccountNo(accountNo) {
    await this.bankAccountNoInput.fill(accountNo);
  }
}
