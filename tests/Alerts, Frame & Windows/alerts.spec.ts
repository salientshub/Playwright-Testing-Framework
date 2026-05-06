import { test, expect } from '@playwright/test';
import { AlertsPage } from '../../pages/Alerts, Frame & Windows/alertsPage';

test.describe('Alerts Tests', () => {
    let alertsPage: AlertsPage;

    test.beforeEach(async ({ page }) => {
        alertsPage = new AlertsPage(page);
        await alertsPage.navigate('/alerts');
    });

    test('should handle simple alert', async ({ page }) => {
        page.on('dialog', async dialog => {
            expect(dialog.type()).toBe('alert');
            expect(dialog.message()).toBeTruthy();
            await dialog.accept();
        });
        await alertsPage.triggerAlert();
    });

    test('should accept confirm dialog', async () => {
        await alertsPage.triggerConfirmAndAccept();
        const result = await alertsPage.getConfirmResult();
        expect(result).toContain('Ok');
    });

    test('should dismiss confirm dialog', async () => {
        await alertsPage.triggerConfirmAndDismiss();
        const result = await alertsPage.getConfirmResult();
        expect(result).toContain('Cancel');
    });

    test('should type in prompt dialog', async () => {
        const testText = 'Hello Playwright';
        await alertsPage.triggerPromptAndType(testText);
        const result = await alertsPage.getPromptResult();
        expect(result).toContain(testText);
    });
});
