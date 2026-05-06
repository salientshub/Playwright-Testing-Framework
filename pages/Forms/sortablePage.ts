import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SortablePage extends BasePage {
  readonly listItems: Locator;

  constructor(page: Page) {
    super(page);
    this.listItems = page.locator('#demo-tabpane-list .list-group-item');
  }

  async getListOrder(): Promise<string[]> {
    return await this.listItems.allTextContents();
  }

  async dragItem(fromIndex: number, toIndex: number) {
    const items = await this.listItems.all();
    await items[fromIndex].dragTo(items[toIndex]);
  }
}