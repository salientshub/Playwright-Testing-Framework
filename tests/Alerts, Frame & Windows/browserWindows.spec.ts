import { test, expect } from '@playwright/test';
import { BrowserWindowsPage } from '../../pages/Alerts, Frame & Windows/browserWindowsPage';

test.describe('Browser Windows Tests', () => {
    let windowsPage: BrowserWindowsPage;

    test.beforeEach(async ({ page }) => {
        windowsPage = new BrowserWindowsPage(page);
        await windowsPage.navigate('/browser-windows');
    });

    test('should open new tab', async () => {
        const newPage = await windowsPage.openNewTab();
        expect(newPage.url()).toContain('sample');
        const heading = await newPage.locator('#sampleHeading').textContent();
        expect(heading).toContain('This is a sample page');
        await newPage.close();
    });

    test('should open new window', async () => {
        const newPage = await windowsPage.openNewWindow();
        expect(newPage.url()).toContain('sample');
        await newPage.close();
    });
});
