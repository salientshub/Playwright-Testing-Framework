import { test, expect } from '@playwright/test';
import { AlertsPage } from '../../pages/Alerts, Frame & Windows/alertsPage';
import * as allure from 'allure-js-commons';

test.describe('Alerts Tests', () => {
    let alertsPage: AlertsPage;

    test.beforeEach(async ({ page }) => {
        alertsPage = new AlertsPage(page);
        await alertsPage.navigate('/alerts');
    });

    test('should handle simple alert @sanity @afw', async ({ page }) => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Alerts');
        await allure.story('Simple Alert');
        await allure.severity('critical');

        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBeTruthy();
            await dialog.accept();
        });
        await alertsPage.triggerAlert();
    });

    test('should accept confirm dialog @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Alerts');
        await allure.story('Accept Confirm');
        await allure.severity('normal');

        await alertsPage.triggerConfirmAndAccept();
        const result = await alertsPage.getConfirmResult();
        expect(result).toContain('Ok');
    });

    test('should dismiss confirm dialog @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Alerts');
        await allure.story('Dismiss Confirm');
        await allure.severity('normal');

        await alertsPage.triggerConfirmAndDismiss();
        const result = await alertsPage.getConfirmResult();
        expect(result).toContain('Cancel');
    });

    test('should type in prompt dialog @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Alerts');
        await allure.story('Prompt Dialog Input');
        await allure.severity('normal');

        const testText = 'Hello Playwright';
        await alertsPage.triggerPromptAndType(testText);
        const result = await alertsPage.getPromptResult();
        expect(result).toContain(testText);
    });
});
