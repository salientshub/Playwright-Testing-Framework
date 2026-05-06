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
    readonly afterdropable: Locator;
    readonly afterdropableAccept: Locator;
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
        this.afterdropable = page.locator(".drop-box.ui-droppable.ui-state-highlight").first();
        this.afterdropableAccept = page.locator("div.drop-box.ui-droppable.ui-state-highlight");
        this.acceptableDrag = page.locator('#acceptable');
        this.notAcceptableDrag = page.locator('#acceptDropContainer .drag-box').filter({ hasText: 'Not Acceptable' });
        this.acceptDropZone = page.locator('#acceptDropContainer .drop-box');
    }

    async switchToSimple() {
        await this.safeClick(this.simpleTab);
    }

    async switchToAccept() {
        await this.safeClick(this.acceptTab);
        // Wait for the tab animation to finish
        await this.page.waitForTimeout(500);
    }

    private async performManualDrag(source: Locator, target: Locator) {
        // Ensure both elements are in view before starting the drag
        await target.scrollIntoViewIfNeeded();
        await source.scrollIntoViewIfNeeded();

        const sourceBox = await source.boundingBox();
        const targetBox = await target.boundingBox();
        if (!sourceBox || !targetBox) return;

        const sourceX = sourceBox.x + sourceBox.width / 2;
        const sourceY = sourceBox.y + sourceBox.height / 2;

        // Target the center of the dropzone, but 30px lower to be safe
        const targetX = targetBox.x + targetBox.width / 2;
        const targetY = targetBox.y + targetBox.height / 2 + 30;

        await this.page.mouse.move(sourceX, sourceY);
        await this.page.mouse.down();

        // Pause to let jQuery UI register the mousedown
        await this.page.waitForTimeout(200);

        // Move the mouse slowly using steps so jQuery UI tracks the path
        await this.page.mouse.move(targetX, targetY, { steps: 20 });

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
