// pages/Interactions/draggablePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class DraggablePage extends BasePage {
    readonly simpleTab: Locator;
    readonly axisRestrictedTab: Locator;
    readonly dragBox: Locator;
    readonly restrictedX: Locator;
    readonly restrictedY: Locator;

    constructor(page: Page) {
        super(page);
        this.simpleTab = page.locator('#draggableExample-tab-simple');
        this.axisRestrictedTab = page.locator('#draggableExample-tab-axisRestriction');
        this.dragBox = page.locator('#dragBox');
        this.restrictedX = page.locator('#restrictedX');
        this.restrictedY = page.locator('#restrictedY');
    }

    async switchToSimple() {
        await this.safeClick(this.simpleTab);
    }

    async switchToAxisRestricted() {
        await this.safeClick(this.axisRestrictedTab);
    }

    async dragSimple(xOffset: number, yOffset: number) {
        await this.dragBox.scrollIntoViewIfNeeded();
        const box = await this.dragBox.boundingBox();
        if (!box) throw new Error('Drag box not found');
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.waitForTimeout(200);
        await this.page.mouse.move(box.x + box.width / 2 + xOffset, box.y + box.height / 2 + yOffset, { steps: 20 });
        await this.page.waitForTimeout(200);
        await this.page.mouse.up();
    }

    async dragXRestricted(xOffset: number) {
        await this.restrictedX.scrollIntoViewIfNeeded();
        const box = await this.restrictedX.boundingBox();
        if (!box) throw new Error('Restricted X box not found');
        await this.page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await this.page.mouse.down();
        await this.page.waitForTimeout(200);
        await this.page.mouse.move(box.x + box.width / 2 + xOffset, box.y + box.height / 2, { steps: 20 });
        await this.page.waitForTimeout(200);
        await this.page.mouse.up();
    }

    async getDragBoxPosition(): Promise<{ x: number; y: number }> {
        const box = await this.dragBox.boundingBox();
        return { x: box?.x || 0, y: box?.y || 0 };
    }
}
