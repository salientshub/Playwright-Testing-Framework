import { test, expect } from '@playwright/test';
import { ProgressBarPage } from '../../pages/Widgets/progressBarPage';

test.describe('Progress Bar Tests', () => {
    let progressPage: ProgressBarPage;

    test.beforeEach(async ({ page }) => {
        progressPage = new ProgressBarPage(page);
        await progressPage.navigate('/progress-bar');
    });

    test('should start and reach 100%', async () => {
        await progressPage.start();
        await progressPage.waitForProgressComplete(15000);
        const value = await progressPage.getProgressValue();
        expect(value).toBe('100');
    });

    test('should stop progress midway', async () => {
        await progressPage.start();
        await progressPage.waitForProgressAtLeast(25, 10000);
        await progressPage.stop();
        const value = parseInt(await progressPage.getProgressValue());
        expect(value).toBeGreaterThanOrEqual(25);
        expect(value).toBeLessThan(100);
    });
});
