import { test, expect } from '@playwright/test';
import { DroppablePage } from '../../pages/Interactions/droppablePage';
import * as allure from 'allure-js-commons';

test.describe('Droppable Tests', () => {
    let droppablePage: DroppablePage;

    test.beforeEach(async ({ page }) => {
        droppablePage = new DroppablePage(page);
        await droppablePage.navigate('/droppable');
    });

    test('should drop element in simple tab @sanity @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Droppable');
        await allure.story('Simple Drop');
        await allure.severity('critical');

        await expect(async () => {
            await droppablePage.dragToDropSimple();
            await expect(droppablePage.droppable).toContainText(/Dropped!/);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });

    test('should accept acceptable element @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Droppable');
        await allure.story('Accept Element');
        await allure.severity('normal');

        await expect(async () => {
            await droppablePage.switchToAccept();
            await droppablePage.dragAcceptableToDropZone();
            await expect(droppablePage.acceptDropZone).toHaveText(/Dropped!/);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });

    test('should not accept non-acceptable element @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Droppable');
        await allure.story('Reject Non-Acceptable Element');
        await allure.severity('normal');

        await droppablePage.switchToAccept();
        await droppablePage.dragNotAcceptableToDropZone();
        await expect(droppablePage.acceptDropZone).not.toContainText(/Dropped!/);
    });
});
