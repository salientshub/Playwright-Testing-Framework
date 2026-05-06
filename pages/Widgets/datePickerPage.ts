// pages/Widgets/datePickerPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class DatePickerPage extends BasePage {
    readonly dateInput: Locator;
    readonly dateTimeInput: Locator;

    constructor(page: Page) {
        super(page);
        this.dateInput = page.locator('#datePickerMonthYearInput');
        this.dateTimeInput = page.locator('#dateAndTimePickerInput');
    }

    async setDate(date: string) {
        await this.dateInput.click({ clickCount: 3 });
        await this.dateInput.fill(date);
        await this.dateInput.press('Enter');
    }

    async setDateTime(dateTime: string) {
        await this.dateTimeInput.click({ clickCount: 3 });
        await this.dateTimeInput.fill(dateTime);
        await this.dateTimeInput.press('Enter');
    }

    async getDate(): Promise<string> {
        return await this.dateInput.inputValue();
    }

    async getDateTime(): Promise<string> {
        return await this.dateTimeInput.inputValue();
    }
}
