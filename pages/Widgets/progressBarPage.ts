// pages/Widgets/progressBarPage.ts
import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ProgressBarPage extends BasePage {
    readonly startStopButton: Locator;
    readonly resetButton: Locator;
    readonly progressBar: Locator;

    constructor(page: Page) {
        super(page);
        this.startStopButton = page.locator('#startStopButton');
        this.resetButton = page.locator('#resetButton');
        this.progressBar = page.locator('.progress-bar');
    }

    async start() {
        await this.safeClick(this.startStopButton);
    }

    async stop() {
        await this.safeClick(this.startStopButton);
    }

    async reset() {
        await this.safeClick(this.resetButton);
    }

    async getProgressValue(): Promise<string> {
        return (await this.progressBar.getAttribute('aria-valuenow')) || '0';
    }

    async waitForProgressComplete(timeout = 15000) {
        await expect(this.progressBar).toHaveAttribute('aria-valuenow', '100', { timeout });
    }

    async waitForProgressAtLeast(target: number, timeout = 15000) {
        await this.page.waitForFunction(
            (t) => {
                const bar = document.querySelector('.progress-bar');
                const val = parseInt(bar?.getAttribute('aria-valuenow') || '0');
                return val >= t;
            },
            target,
            { timeout }
        );
    }
}
