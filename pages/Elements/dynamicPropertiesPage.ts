// pages/Elements/dynamicPropertiesPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class DynamicPropertiesPage extends BasePage {
    readonly enableAfterButton: Locator;
    readonly colorChangeButton: Locator;
    readonly visibleAfterButton: Locator;

    constructor(page: Page) {
        super(page);
        this.enableAfterButton = page.getByRole('button', { name: 'Will enable 5 seconds' });
        this.colorChangeButton = page.getByRole('button', { name: 'Color Change' });
        this.visibleAfterButton = page.getByRole('button', { name: 'Visible After 5 Seconds' });
    }

    async waitForEnableAfterButton(timeout = 6000) {
        await this.enableAfterButton.waitFor({ state: 'visible' });
        await expect(this.enableAfterButton).toBeEnabled({ timeout });
    }

    async waitForVisibleAfterButton(timeout = 6000) {
        await this.visibleAfterButton.waitFor({ state: 'visible', timeout });
    }

    async getColorChangeButtonColor(): Promise<string> {
        return await this.colorChangeButton.evaluate(el => window.getComputedStyle(el).color);
    }
}