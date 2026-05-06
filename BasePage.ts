// BasePage.ts
import { Page, Locator, expect } from '@playwright/test';

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigate(url: string, waitForSelector?: string) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
        if (waitForSelector) {
            await this.page.locator(waitForSelector).waitFor({ state: 'visible' });
        }
    }

    async waitForVisible(locator: Locator, timeout = 5000) {
        await locator.waitFor({ state: 'visible', timeout });
    }

    async scrollToElement(locator: Locator) {
        await locator.scrollIntoViewIfNeeded();
    }

    async safeClick(locator: Locator) {
        await this.scrollToElement(locator);
        await locator.waitFor({ state: 'visible' });
        await locator.click({ force: true });
    }

    async takeScreenshot(name: string) {
        await this.page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
    }

    async handleDialog(accept = true, textToType?: string) {
        this.page.on('dialog', async dialog => {
            if (textToType !== undefined) await dialog.accept(textToType);
            else if (accept) await dialog.accept();
            else await dialog.dismiss();
        });
    }

    async clearStorage() {
        await this.page.context().clearCookies();
        await this.page.evaluate(() => localStorage.clear());
    }
}