import { test, expect } from '@playwright/test';
import { DroppablePage } from '../../pages/Interactions/droppablePage';

test.describe('Droppable Tests', () => {
    let droppablePage: DroppablePage;

    test.beforeEach(async ({ page }) => {
        droppablePage = new DroppablePage(page);
        await droppablePage.navigate('/droppable');
    });

    test('should drop element in simple tab', async () => {
        await expect(async () => {
            await droppablePage.dragToDropSimple();
            await expect(droppablePage.droppable).toContainText(/Dropped!/);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });

    test('should accept acceptable element', async () => {
        await expect(async () => {
            await droppablePage.switchToAccept();
            await droppablePage.dragAcceptableToDropZone();
            await expect(droppablePage.acceptDropZone).toHaveText(/Dropped!/);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });

    test('should not accept non-acceptable element', async () => {
        await droppablePage.switchToAccept();
        await droppablePage.dragNotAcceptableToDropZone();
        await expect(droppablePage.acceptDropZone).not.toContainText(/Dropped!/);
    });
});
