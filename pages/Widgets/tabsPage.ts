// pages/Widgets/tabsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class TabsPage extends BasePage {
    readonly whatTab: Locator;
    readonly originTab: Locator;
    readonly useTab: Locator;
    readonly moreTab: Locator;
    readonly whatContent: Locator;
    readonly originContent: Locator;
    readonly useContent: Locator;

    constructor(page: Page) {
        super(page);
        this.whatTab = page.locator('#demo-tab-what');
        this.originTab = page.locator('#demo-tab-origin');
        this.useTab = page.locator('#demo-tab-use');
        this.moreTab = page.locator('#demo-tab-more');
        this.whatContent = page.locator('#demo-tabpane-what');
        this.originContent = page.locator('#demo-tabpane-origin');
        this.useContent = page.locator('#demo-tabpane-use');
    }

    async clickWhat() {
        await this.safeClick(this.whatTab);
    }

    async clickOrigin() {
        await this.safeClick(this.originTab);
    }

    async clickUse() {
        await this.safeClick(this.useTab);
    }

    async isWhatContentVisible(): Promise<boolean> {
        return await this.whatContent.isVisible();
    }

    async isOriginContentVisible(): Promise<boolean> {
        return await this.originContent.isVisible();
    }

    async isUseContentVisible(): Promise<boolean> {
        return await this.useContent.isVisible();
    }

    async isMoreTabDisabled(): Promise<boolean> {
        const cls = await this.moreTab.getAttribute('class');
        return cls?.includes('disabled') || false;
    }

    async getActiveTabContent(): Promise<string> {
        const activePane = this.page.locator('.tab-pane.active');
        return (await activePane.textContent()) || '';
    }
}
