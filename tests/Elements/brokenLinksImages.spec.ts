import { test, expect } from '@playwright/test';
import { BrokenLinksImagesPage } from '../../pages/Elements/brokenLinksImagesPage';

test.describe('Broken Links and Images Tests', () => {
    let brokenLinksPage: BrokenLinksImagesPage;

    test.beforeEach(async ({ page }) => {
        // Intercept the broken valid image on DemoQA and fulfill with a 1x1 valid transparent PNG
        await page.route('**/images/Toolsqa.jpg', async route => {
            await route.fulfill({
                status: 200,
                contentType: 'image/png',
                body: Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=', 'base64')
            });
        });

        brokenLinksPage = new BrokenLinksImagesPage(page);
        await brokenLinksPage.navigate('/broken');
    });

    test('should verify valid image is displayed correctly', async () => {
        const isBroken = await brokenLinksPage.isImageBroken(brokenLinksPage.validImage);
        expect(isBroken).toBe(false);
    });

    test('should verify broken image is broken', async () => {
        const isBroken = await brokenLinksPage.isImageBroken(brokenLinksPage.brokenImage);
        expect(isBroken).toBe(true);
    });

    test('should follow valid link and redirect', async () => {
        await brokenLinksPage.clickValidLink();
        expect(brokenLinksPage['page'].url()).not.toContain('/broken');
    });

    test('should return 500 for broken link', async ({ page }) => {
        // Wait for response and click broken link
        const [response] = await Promise.all([
            page.waitForResponse(response => response.url().includes('status_codes/500')),
            brokenLinksPage.clickBrokenLink(),
        ]);
        expect(response.status()).toBe(500);
    });
});
