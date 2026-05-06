// pages/Interactions/sortablePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SortablePage extends BasePage {
    readonly listTab: Locator;
    readonly gridTab: Locator;
    readonly listItems: Locator;
    readonly gridItems: Locator;

    constructor(page: Page) {
        super(page);
        this.listTab = page.locator('#demo-tab-list');
        this.gridTab = page.locator('#demo-tab-grid');
        this.listItems = page.locator('#demo-tabpane-list .list-group-item');
        this.gridItems = page.locator('#demo-tabpane-grid .list-group-item');
    }

    async switchToList() {
        await this.safeClick(this.listTab);
    }

    async switchToGrid() {
        await this.safeClick(this.gridTab);
    }

    async getListOrder(): Promise<string[]> {
        return await this.listItems.allTextContents();
    }

    async getGridOrder(): Promise<string[]> {
        return await this.gridItems.allTextContents();
    }

    async dragListItem(fromIndex: number, toIndex: number) {
        const items = await this.listItems.all();
        await items[fromIndex].dragTo(items[toIndex]);
    }
}
