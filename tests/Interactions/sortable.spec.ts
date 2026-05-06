import { test, expect } from '@playwright/test';
import { SortablePage } from '../../pages/Interactions/sortablePage';

test.describe('Sortable Tests', () => {
    let sortablePage: SortablePage;

    test.beforeEach(async ({ page }) => {
        sortablePage = new SortablePage(page);
        await sortablePage.navigate('/sortable');
    });

    test('should display list items', async () => {
        const order = await sortablePage.getListOrder();
        expect(order.length).toBeGreaterThan(0);
    });

    test.only('should drag and reorder list items', async ({ page }) => {
        const initialOrder = await sortablePage.getListOrder();
        
        await expect(async () => {
            
            await page.evaluate('window.getSelection()?.removeAllRanges()');
            
            const source = sortablePage.listItems.nth(0);
            const target = sortablePage.listItems.nth(2);

            const sourceBox = await source.boundingBox();
            const targetBox = await target.boundingBox();

            if (sourceBox && targetBox) {
                await page.mouse.move(sourceBox.x + sourceBox.width / 2, sourceBox.y + sourceBox.height / 2);
                await page.mouse.down();
                await page.mouse.move(targetBox.x + targetBox.width / 2, targetBox.y + targetBox.height / 2, { steps: 20 });
                await page.mouse.up();
            }

            const newOrder = await sortablePage.getListOrder();
            expect(newOrder).not.toEqual(initialOrder);
        }).toPass();
    });

    test('should switch to grid view', async () => {
        await sortablePage.switchToGrid();
        const gridItems = await sortablePage.getGridOrder();
        expect(gridItems.length).toBeGreaterThan(0);
    });
});
