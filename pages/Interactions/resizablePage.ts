// pages/Interactions/resizablePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ResizablePage extends BasePage {
    readonly restrictedBox: Locator;
    readonly restrictedHandle: Locator;
    readonly unrestrictedBox: Locator;
    readonly unrestrictedHandle: Locator;

    constructor(page: Page) {
        super(page);
        this.restrictedBox = page.locator('#resizableBoxWithRestriction');
        this.restrictedHandle = this.restrictedBox.locator('.react-resizable-handle');
        this.unrestrictedBox = page.locator('#resizable');
        this.unrestrictedHandle = this.unrestrictedBox.locator('.react-resizable-handle');
    }

    async resizeRestricted(xOffset: number, yOffset: number) {
        const handle = this.restrictedHandle;
        await handle.scrollIntoViewIfNeeded(); // Ensure handle is visible
        const box = await handle.boundingBox();
        if (!box) throw new Error('Handle not found');
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();
        await this.page.mouse.move(startX + xOffset, startY + yOffset);
        await this.page.mouse.up();
    }

    async resizeUnrestricted(xOffset: number, yOffset: number) {
        const handle = this.unrestrictedHandle;
        await handle.scrollIntoViewIfNeeded(); // Ensure handle is visible
        const box = await handle.boundingBox();
        if (!box) throw new Error('Handle not found');
        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;
        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();
        await this.page.mouse.move(startX + xOffset, startY + yOffset);
        await this.page.mouse.up();
    }

    async getRestrictedBoxSize(): Promise<{ width: number; height: number }> {
        const box = await this.restrictedBox.boundingBox();
        return { width: box?.width || 0, height: box?.height || 0 };
    }

    async getUnrestrictedBoxSize(): Promise<{ width: number; height: number }> {
        const box = await this.unrestrictedBox.boundingBox();
        return { width: box?.width || 0, height: box?.height || 0 };
    }
}
