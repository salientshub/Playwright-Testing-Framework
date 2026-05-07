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

    /** Remove ads and fixed footer that intercept mouse events */
    private async removeOverlays() {
        await this.page.evaluate(() => {
            document.querySelectorAll('iframe').forEach(el => el.remove());
            document.querySelectorAll('[id*="Ad.Plus"], [id*="google_ads"], .ad, #adplus-anchor').forEach(el => el.remove());
            const footer = document.querySelector('footer');
            if (footer) (footer as HTMLElement).style.position = 'static';
        });
    }

    async switchToSimple() {
        await this.safeClick(this.simpleTab);
    }

    async switchToAxisRestricted() {
        await this.safeClick(this.axisRestrictedTab);
    }

    private async performDrag(source: Locator, xOffset: number, yOffset: number) {
        await this.removeOverlays();
        await this.page.evaluate('window.getSelection()?.removeAllRanges()');
        await source.scrollIntoViewIfNeeded();

        const box = await source.boundingBox();
        if (!box) throw new Error('Drag source not found');

        const startX = box.x + box.width / 2;
        const startY = box.y + box.height / 2;

        await this.page.mouse.move(startX, startY);
        await this.page.mouse.down();
        await this.page.waitForTimeout(200);
        await this.page.mouse.move(startX + xOffset, startY + yOffset, { steps: 25 });
        await this.page.waitForTimeout(200);
        await this.page.mouse.up();
    }

    async dragSimple(xOffset: number, yOffset: number) {
        await this.performDrag(this.dragBox, xOffset, yOffset);
    }

    async dragXRestricted(xOffset: number) {
        await this.performDrag(this.restrictedX, xOffset, 0);
    }

    async getDragBoxPosition(): Promise<{ x: number; y: number }> {
        const box = await this.dragBox.boundingBox();
        return { x: box?.x || 0, y: box?.y || 0 };
    }
}
