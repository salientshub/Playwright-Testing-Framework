import { test, expect } from '@playwright/test';
import { FramesPage } from '../../pages/Alerts, Frame & Windows/framesPage';

test.describe('Frames Tests', () => {
    let framesPage: FramesPage;

    test.beforeEach(async ({ page }) => {
        framesPage = new FramesPage(page);
        await framesPage.navigate('/frames');
    });

    test('should read text from frame 1', async () => {
        const text = await framesPage.getFrame1Text();
        expect(text).toContain('This is a sample page');
    });

    test('should read text from frame 2', async () => {
        const text = await framesPage.getFrame2Text();
        expect(text).toContain('This is a sample page');
    });

    test('should verify frame 1 has dimensions', async () => {
        const dims = await framesPage.getFrame1Dimensions();
        expect(dims.width).toBeGreaterThan(0);
        expect(dims.height).toBeGreaterThan(0);
    });
});
