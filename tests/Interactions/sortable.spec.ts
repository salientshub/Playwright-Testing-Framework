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

    test('should drag and reorder list items', async () => {
        const initialOrder = await sortablePage.getListOrder();
        await sortablePage.dragListItem(0, 2);
        const newOrder = await sortablePage.getListOrder();
        expect(newOrder).not.toEqual(initialOrder);
    });

    test('should switch to grid view', async () => {
        await sortablePage.switchToGrid();
        const gridItems = await sortablePage.getGridOrder();
        expect(gridItems.length).toBeGreaterThan(0);
    });
});
