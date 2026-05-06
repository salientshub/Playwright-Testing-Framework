import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class FramesPage extends BasePage {
  readonly frame1: Locator;
  readonly frame2: Locator;

  constructor(page: Page) {
    super(page);
    this.frame1 = page.frameLocator('#frame1').locator('body');
    this.frame2 = page.frameLocator('#frame2').locator('body');
  }

  async getFrame1Text(): Promise<string> {
    return await this.frame1.textContent() || '';
  }
}