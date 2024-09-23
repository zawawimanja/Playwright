import { Page } from '@playwright/test';


export class CalendarPage {
    private page: Page;


    constructor(page: Page) {
        this.page = page;

    }


    private get baristaPageOut() {
        return this.page.frameLocator('#baristaPageOut');
    }

    async selectDate(year: string, month: string) {
        await this.baristaPageOut.getByRole('combobox').nth(3).selectOption(year);
        await this.baristaPageOut.getByRole('combobox').nth(2).selectOption(month);
  
       
     

        
    }


    async navigateCalendar(direction: 'prev' | 'next') {
        await this.baristaPageOut.getByTitle(direction === 'prev' ? 'Prev' : 'Next', { exact: true }).click();
        
    }

    async selectDay(day: string) {
        await this.baristaPageOut.getByRole('cell', { name: day, exact: true }).click();
      
    }
}
