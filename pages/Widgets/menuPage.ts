// pages/Widgets/menuPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class MenuPage extends BasePage {
    readonly menuItems: Locator;
    readonly mainItem1: Locator;
    readonly mainItem2: Locator;
    readonly mainItem3: Locator;
    readonly subItem1: Locator;
    readonly subItem2: Locator;
    readonly subSubList: Locator;

    constructor(page: Page) {
        super(page);
        this.menuItems = page.locator('#nav li');
        this.mainItem1 = page.getByText('Main Item 1');
        this.mainItem2 = page.getByText('Main Item 2');
        this.mainItem3 = page.getByText('Main Item 3');
        this.subItem1 = page.getByText('Sub Item');
        this.subItem2 = page.getByText('SUB SUB LIST »');
        this.subSubList = page.getByText('Sub Sub Item 1');
    }

    async hoverMainItem2() {
        await this.mainItem2.hover();
    }

    async hoverSubSubList() {
        await this.subItem2.hover();
    }

    async getMenuItemCount(): Promise<number> {
        return await this.menuItems.count();
    }
}
