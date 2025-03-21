import { Page } from '@playwright/test';

export class TimePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private get baristaPageOut() {
    return this.page.frameLocator('#baristaPageOut');
  }

  // Get hour selector (first dropdown)
  private get hourSelect() {
    return this.baristaPageOut.locator('select.ui-timepicker-select').first();
  }

  // Get minute selector (second dropdown)
  private get minuteSelect() {
    return this.baristaPageOut.locator('select.ui-timepicker-select').nth(1);
  }

  // Get second selector (third dropdown)
  private get secondSelect() {
    return this.baristaPageOut.locator('select.ui-timepicker-select').nth(2);
  }

  async selectTimeOption(hour: number, minutes: number, seconds: number) {
    // Convert to 12-hour format
    const period = hour >= 12 ? 'PM' : 'AM';
    let hour12 = hour % 12;
    hour12 = hour12 === 0 ? 12 : hour12; // Convert 0 to 12

    // Format values
    const hourStr = hour12.toString();
    const minutesStr = minutes.toString();
    const secondsStr = seconds.toString();

    // Wait for the frame to be ready
    await this.baristaPageOut.waitFor({ state: 'attached' });

    // Select time values one by one with explicit waits
    try {
      await this.hourSelect.waitFor({ state: 'visible', timeout: 5000 });
      await this.hourSelect.selectOption(hourStr);

      await this.minuteSelect.waitFor({ state: 'visible', timeout: 5000 });
      await this.minuteSelect.selectOption(minutesStr);

      await this.secondSelect.waitFor({ state: 'visible', timeout: 5000 });
      await this.secondSelect.selectOption(secondsStr);

      // Note: Removed period selection since it's handled automatically by the dropdown values
    } catch (error) {
      console.error('Error selecting time:', error);
      throw error;
    }
  }

  async selectTimeOption2(option: string) {
    await this.minuteSelect.selectOption(option);
  }

  async selectTimeOption3(option: string) {
    await this.secondSelect.selectOption(option);
  }
}