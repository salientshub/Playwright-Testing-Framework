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
        // Use role-based locator — the tooltip has role="tooltip" in the DOM
        this.toolTip = page.getByRole('tooltip');
    }

    async hoverOverButton() {
        await this.hoverButton.hover();
    }

    async hoverOverInput() {
        await this.hoverInput.hover();
    }

    async getToolTipText(): Promise<string> {
        // No need for waitForSelector — the locator-based assertion
        // in the test will auto-wait for visibility.
        return (await this.toolTip.textContent()) || '';
    }
}
