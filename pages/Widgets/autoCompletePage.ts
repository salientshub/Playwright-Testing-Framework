// pages/Widgets/autoCompletePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class AutoCompletePage extends BasePage {
    readonly multipleInput: Locator;
    readonly singleInput: Locator;
    readonly multipleValues: Locator;
    readonly singleValue: Locator;

    constructor(page: Page) {
        super(page);
        this.multipleInput = page.locator('#autoCompleteMultipleInput');
        this.singleInput = page.locator('#autoCompleteSingleInput');
        this.multipleValues = page.locator('.auto-complete__multi-value__label');
        this.singleValue = page.locator('.auto-complete__single-value');
    }

    async typeMultipleColor(color: string) {
        await this.multipleInput.fill(color);
        await this.page.waitForSelector('.auto-complete__option', { state: 'visible' });
        await this.page.locator('.auto-complete__option').first().click();
    }

    async typeSingleColor(color: string) {
        await this.singleInput.fill(color);
        await this.page.waitForSelector('.auto-complete__option', { state: 'visible' });
        await this.page.locator('.auto-complete__option').first().click();
    }

    async getMultipleValues(): Promise<string[]> {
        return await this.multipleValues.allTextContents();
    }

    async getSingleValue(): Promise<string> {
        return (await this.singleValue.textContent()) || '';
    }
}
