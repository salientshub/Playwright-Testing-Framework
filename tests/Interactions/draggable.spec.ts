import { test, expect } from '@playwright/test';
import { DraggablePage } from '../../pages/Interactions/draggablePage';

test.describe('Draggable Tests', () => {
    let draggablePage: DraggablePage;

    test.beforeEach(async ({ page }) => {
        draggablePage = new DraggablePage(page);
        await draggablePage.navigate('/dragabble');
    });

    test('should drag element freely', async ({ page }) => {
        await expect(async () => {
            // Clear text selection to prevent browser text-drag interference
            await page.evaluate('window.getSelection()?.removeAllRanges()');
            
            const initialPos = await draggablePage.getDragBoxPosition();
            await draggablePage.dragSimple(100, 100);
            const newPos = await draggablePage.getDragBoxPosition();
            expect(newPos.x).not.toBe(initialPos.x);
            expect(newPos.y).not.toBe(initialPos.y);
        }).toPass({
            intervals: [1000],
            timeout: 10000
        });
    });

    test('should restrict drag on X axis only', async () => {
        await draggablePage.switchToAxisRestricted();
        const restrictedX = draggablePage.restrictedX;
        const initialBox = await restrictedX.boundingBox();
        await draggablePage.dragXRestricted(100);
        const newBox = await restrictedX.boundingBox();
        expect(newBox!.x).not.toBe(initialBox!.x);
    });
});
