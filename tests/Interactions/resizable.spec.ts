import { test, expect } from '@playwright/test';
import { ResizablePage } from '../../pages/Interactions/resizablePage';
import { allure } from 'allure-js-commons';

test.describe('Resizable Tests', () => {
    let resizablePage: ResizablePage;

    test.beforeEach(async ({ page }) => {
        resizablePage = new ResizablePage(page);
        await resizablePage.navigate('/resizable');
    });

    test('should resize restricted box @sanity @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Resizable');
        await allure.story('Resize Restricted Box');
        await allure.severity('critical');

        const initialSize = await resizablePage.getRestrictedBoxSize();
        await resizablePage.resizeRestricted(100, 50);
        const newSize = await resizablePage.getRestrictedBoxSize();
        expect(newSize.width).toBeGreaterThan(initialSize.width);
    });

    test('should resize unrestricted box @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Resizable');
        await allure.story('Resize Unrestricted Box');
        await allure.severity('normal');

        const initialSize = await resizablePage.getUnrestrictedBoxSize();
        await resizablePage.resizeUnrestricted(100, 100);
        const newSize = await resizablePage.getUnrestrictedBoxSize();
        console.log(`New width: ${newSize.width}, New height: ${newSize.height}`);
        expect(newSize.width).toBeGreaterThan(initialSize.width);
        expect(newSize.height).toBeGreaterThan(initialSize.height);
    });
});
