// pages/Alerts, Frame & Windows/browserWindowsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class BrowserWindowsPage extends BasePage {
    readonly newTabButton: Locator;
    readonly newWindowButton: Locator;
    readonly newWindowMessageButton: Locator;

    constructor(page: Page) {
        super(page);
        this.newTabButton = page.locator('#tabButton');
        this.newWindowButton = page.locator('#windowButton');
        this.newWindowMessageButton = page.locator('#messageWindowButton');
    }

    async openNewTab(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.safeClick(this.newTabButton),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async openNewWindow(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.safeClick(this.newWindowButton),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }

    async openNewWindowMessage(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.safeClick(this.newWindowMessageButton),
        ]);
        await newPage.waitForLoadState();
        return newPage;
    }
}
