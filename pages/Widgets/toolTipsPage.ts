// pages/Widgets/toolTipsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ToolTipsPage extends BasePage {
    readonly hoverButton: Locator;
    readonly hoverInput: Locator;
    readonly toolTip: Locator;

    constructor(page: Page) {
        super(page);
        this.hoverButton = page.locator('#toolTipButton');
        this.hoverInput = page.locator('#toolTipTextField');
        this.toolTip = page.locator('.tooltip-inner');
    }

    async hoverOverButton() {
        await this.hoverButton.hover();
    }

    async hoverOverInput() {
        await this.hoverInput.hover();
    }

    async getToolTipText(): Promise<string> {
        await this.page.waitForSelector('.tooltip-inner', { state: 'visible' });
        return (await this.toolTip.textContent()) || '';
    }
}
