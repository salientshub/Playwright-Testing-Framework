import { test, expect } from '@playwright/test';
import { DroppablePage } from '../../pages/Interactions/droppablePage';

test.describe('Droppable Tests', () => {
    let droppablePage: DroppablePage;

    test.beforeEach(async ({ page }) => {
        droppablePage = new DroppablePage(page);
        await droppablePage.navigate('/droppable');
    });

    test('should drop element in simple tab', async ({ page }) => {
        await droppablePage.dragToDropSimple();

        await expect(droppablePage.afterdropable).toContainText(/Dropped!/);
    });

    test('should accept acceptable element', async () => {
        await droppablePage.switchToAccept();
        await droppablePage.dragAcceptableToDropZone();
        await expect(droppablePage.afterdropableAccept).toHaveText(/Dropped!/);
    });

    test('should not accept non-acceptable element', async () => {
        await droppablePage.switchToAccept();
        await droppablePage.dragNotAcceptableToDropZone();
        await expect(droppablePage.acceptDropZone).not.toContainText(/Dropped!/);
    });
});
