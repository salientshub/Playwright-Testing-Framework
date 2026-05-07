// pages/Interactions/droppablePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class DroppablePage extends BasePage {
    readonly simpleTab: Locator;
    readonly acceptTab: Locator;
    readonly preventTab: Locator;
    readonly revertTab: Locator;
    readonly draggable: Locator;
    readonly droppable: Locator;
    readonly acceptableDrag: Locator;
    readonly notAcceptableDrag: Locator;
    readonly acceptDropZone: Locator;

    constructor(page: Page) {
        super(page);
        this.simpleTab = page.locator('#droppableExample-tab-simple');
        this.acceptTab = page.locator('#droppableExample-tab-accept');
        this.preventTab = page.locator('#droppableExample-tab-preventPropogation');
        this.revertTab = page.locator('#droppableExample-tab-revertable');
        this.draggable = page.locator('#draggable');
        this.droppable = page.locator('#droppableExample-tabpane-simple #droppable');
        this.acceptableDrag = page.locator('#acceptable');
        this.notAcceptableDrag = page.locator('#acceptDropContainer .drag-box').filter({ hasText: 'Not Acceptable' });
        this.acceptDropZone = page.locator('#acceptDropContainer .drop-box');
    }

    /** Remove ads and fixed footer that intercept mouse events */
    private async removeOverlays() {
        await this.page.evaluate(() => {
            // Remove all ad iframes
            document.querySelectorAll('iframe').forEach(el => el.remove());
            // Remove ad container divs
            document.querySelectorAll('[id*="Ad.Plus"], [id*="google_ads"], .ad, #adplus-anchor').forEach(el => el.remove());
            // Make footer non-fixed so it doesn't overlay the drag area
            const footer = document.querySelector('footer');
            if (footer) (footer as HTMLElement).style.position = 'static';
        });
    }

    async switchToSimple() {
        await this.safeClick(this.simpleTab);
    }

    async switchToAccept() {
        await this.safeClick(this.acceptTab);
        await this.page.waitForTimeout(300);
    }

    private async performManualDrag(source: Locator, target: Locator) {
        // Remove ads/overlays that steal mouse events
        await this.removeOverlays();
        // Clear text selection to prevent text-drag interference
        await this.page.evaluate('window.getSelection()?.removeAllRanges()');

        await source.scrollIntoViewIfNeeded();

        const sourceBox = await source.boundingBox();
        const targetBox = await target.boundingBox();
        if (!sourceBox || !targetBox) throw new Error('Source or target element not found');

        const sourceX = sourceBox.x + sourceBox.width / 2;
        const sourceY = sourceBox.y + sourceBox.height / 2;
        const targetX = targetBox.x + targetBox.width / 2;
        const targetY = targetBox.y + targetBox.height / 2;

        await this.page.mouse.move(sourceX, sourceY);
        await this.page.mouse.down();
        // Pause to let jQuery UI register the mousedown
        await this.page.waitForTimeout(200);
        // Move slowly so jQuery UI tracks the path
        await this.page.mouse.move(targetX, targetY, { steps: 25 });
        // Pause to let jQuery UI register the hover over the drop zone
        await this.page.waitForTimeout(200);
        await this.page.mouse.up();
    }

    async dragToDropSimple() {
        await this.performManualDrag(this.draggable, this.droppable);
    }

    async dragAcceptableToDropZone() {
        await this.performManualDrag(this.acceptableDrag, this.acceptDropZone);
    }

    async dragNotAcceptableToDropZone() {
        await this.performManualDrag(this.notAcceptableDrag, this.acceptDropZone);
    }

    async getDroppableText(): Promise<string> {
        return (await this.droppable.textContent()) || '';
    }

    async getAcceptDropZoneText(): Promise<string> {
        return (await this.acceptDropZone.textContent()) || '';
    }
}
