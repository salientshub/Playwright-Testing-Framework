import { test, expect } from '@playwright/test';
import { BrowserWindowsPage } from '../../pages/Alerts, Frame & Windows/browserWindowsPage';
import * as allure from 'allure-js-commons';

test.describe('Browser Windows Tests', () => {
    let windowsPage: BrowserWindowsPage;

    test.beforeEach(async ({ page }) => {
        windowsPage = new BrowserWindowsPage(page);
        await windowsPage.navigate('/browser-windows');
    });

    test('should open new tab @sanity @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Browser Windows');
        await allure.story('Open New Tab');
        await allure.severity('critical');

        const newPage = await windowsPage.openNewTab();
        expect(newPage.url()).toContain('sample');
        const heading = await newPage.locator('#sampleHeading').textContent();
        expect(heading).toContain('This is a sample page');
        await newPage.close();
    });

    test('should open new window @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Browser Windows');
        await allure.story('Open New Window');
        await allure.severity('normal');

        const newPage = await windowsPage.openNewWindow();
        expect(newPage.url()).toContain('sample');
        await newPage.close();
    });
});
