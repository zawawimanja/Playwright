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

    async selectDatePreregPage(year: string, month: string) {
        
        await this.baristaPageOut.getByRole('combobox').nth(3).selectOption(year);
        await this.baristaPageOut.getByRole('combobox').nth(2).selectOption(month);
        
    }

       async selectDateInsuredPersonPage(year: string, month: string) {
        
        await this.uidatepicker.getByRole('combobox').nth(1).selectOption(year);
      
    
       
         await this.uidatepicker.getByRole('combobox').first().selectOption('4');
        
    }

 async selectDayPreregPage(day: string) {
        await this.baristaPageOut.getByRole('cell', { name: day, exact: true }).click();
      
    }


     async selectDayInsuredPersonPage(day: string) {
        await this.page.getByRole('link', { name: day, exact: true }).click();
      
    }





     



    async navigateCalendar(direction: 'prev' | 'next') {
        await this.baristaPageOut.getByTitle(direction === 'prev' ? 'Prev' : 'Next', { exact: true }).click();
        
    }

   
}
