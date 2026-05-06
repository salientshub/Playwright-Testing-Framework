// pages/Alerts, Frame & Windows/framesPage.ts
import { Page, FrameLocator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class FramesPage extends BasePage {
    readonly frame1: FrameLocator;
    readonly frame2: FrameLocator;

    constructor(page: Page) {
        super(page);
        this.frame1 = page.frameLocator('#frame1');
        this.frame2 = page.frameLocator('#frame2');
    }

    async getFrame1Text(): Promise<string> {
        return (await this.frame1.locator('#sampleHeading').textContent()) || '';
    }

    async getFrame2Text(): Promise<string> {
        return (await this.frame2.locator('#sampleHeading').textContent()) || '';
    }

    async getFrame1Dimensions(): Promise<{ width: number; height: number }> {
        const frame = this.page.locator('#frame1');
        const box = await frame.boundingBox();
        return { width: box?.width || 0, height: box?.height || 0 };
    }
}
