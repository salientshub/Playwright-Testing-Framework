// pages/Alerts, Frame & Windows/nestedFramesPage.ts
import { Page, FrameLocator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class NestedFramesPage extends BasePage {
    readonly parentFrame: FrameLocator;
    readonly childFrame: FrameLocator;

    constructor(page: Page) {
        super(page);
        this.parentFrame = page.frameLocator('#frame1');
        this.childFrame = this.parentFrame.frameLocator('iframe');
    }

    async getParentFrameText(): Promise<string> {
        return (await this.parentFrame.locator('body').textContent()) || '';
    }

    async getChildFrameText(): Promise<string> {
        return (await this.childFrame.locator('body').textContent()) || '';
    }
}
