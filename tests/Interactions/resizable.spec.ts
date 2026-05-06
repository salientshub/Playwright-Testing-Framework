import { test, expect } from '@playwright/test';
import { ResizablePage } from '../../pages/Interactions/resizablePage';

test.describe('Resizable Tests', () => {
    let resizablePage: ResizablePage;

    test.beforeEach(async ({ page }) => {
        resizablePage = new ResizablePage(page);
        await resizablePage.navigate('/resizable');
    });

    test('should resize restricted box', async () => {
        const initialSize = await resizablePage.getRestrictedBoxSize();
        await resizablePage.resizeRestricted(100, 50);
        const newSize = await resizablePage.getRestrictedBoxSize();
        expect(newSize.width).toBeGreaterThan(initialSize.width);
    });

    test('should resize unrestricted box', async () => {
        const initialSize = await resizablePage.getUnrestrictedBoxSize();
        await resizablePage.resizeUnrestricted(100, 100);
        const newSize = await resizablePage.getUnrestrictedBoxSize();
        console.log(`New width: ${newSize.width}, New height: ${newSize.height}`);
        expect(newSize.width).toBeGreaterThan(initialSize.width);
        expect(newSize.height).toBeGreaterThan(initialSize.height);
    });
});

