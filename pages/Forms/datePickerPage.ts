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
    await this.dateInput.fill(date);
    await this.dateInput.press('Enter');
  }

  async setDateTime(dateTime: string) {
    await this.dateTimeInput.fill(dateTime);
    await this.dateTimeInput.press('Enter');
  }

  async getDate(): Promise<string> {
    return await this.dateInput.inputValue();
  }
}