import { test, expect } from '@playwright/test';
import { DraggablePage } from '../../pages/Interactions/draggablePage';
import { allure } from 'allure-js-commons';

test.describe('Draggable Tests', () => {
    let draggablePage: DraggablePage;

    test.beforeEach(async ({ page }) => {
        draggablePage = new DraggablePage(page);
        await draggablePage.navigate('/dragabble');
    });

    test('should drag element freely @sanity @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Draggable');
        await allure.story('Free Drag');
        await allure.severity('critical');

        await expect(async () => {
            const initialPos = await draggablePage.getDragBoxPosition();
            await draggablePage.dragSimple(100, 100);
            const newPos = await draggablePage.getDragBoxPosition();
            expect(newPos.x).not.toBe(initialPos.x);
            expect(newPos.y).not.toBe(initialPos.y);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });

    test('should restrict drag on X axis only @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Draggable');
        await allure.story('Axis Restricted Drag');
        await allure.severity('normal');

        await expect(async () => {
            await draggablePage.switchToAxisRestricted();
            const initialBox = await draggablePage.restrictedX.boundingBox();
            await draggablePage.dragXRestricted(100);
            const newBox = await draggablePage.restrictedX.boundingBox();
            expect(newBox!.x).not.toBe(initialBox!.x);
        }).toPass({
            intervals: [1000],
            timeout: 15000
        });
    });
});
