// pages/Interactions/selectablePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SelectablePage extends BasePage {
    readonly listTab: Locator;
    readonly gridTab: Locator;
    readonly listItems: Locator;
    readonly gridItems: Locator;

    constructor(page: Page) {
        super(page);
        this.listTab = page.locator('#demo-tab-list');
        this.gridTab = page.locator('#demo-tab-grid');
        this.listItems = page.locator('#verticalListContainer .list-group-item');
        this.gridItems = page.locator('#gridContainer .list-group-item');
    }

    async selectListItem(index: number) {
        const items = await this.listItems.all();
        await items[index].click();
    }

    async selectGridItem(index: number) {
        const items = await this.gridItems.all();
        await items[index].click();
    }

    async getSelectedListItems(): Promise<string[]> {
        const selected = this.page.locator('#verticalListContainer .list-group-item.active');
        return await selected.allTextContents();
    }

    async getSelectedGridItems(): Promise<string[]> {
        const selected = this.page.locator('#gridContainer .list-group-item.active');
        return await selected.allTextContents();
    }

    async switchToGrid() {
        await this.safeClick(this.gridTab);
    }
}
