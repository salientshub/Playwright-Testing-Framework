import { test, expect } from '@playwright/test';
import { TabsPage } from '../../pages/Widgets/tabsPage';

test.describe('Tabs Tests', () => {
    let tabsPage: TabsPage;

    test.beforeEach(async ({ page }) => {
        tabsPage = new TabsPage(page);
        await tabsPage.navigate('/tabs');
    });

    test('should show What tab by default', async () => {
        expect(await tabsPage.isWhatContentVisible()).toBe(true);
    });

    test('should switch to Origin tab', async () => {
        await tabsPage.clickOrigin();
        expect(await tabsPage.isOriginContentVisible()).toBe(true);
        expect(await tabsPage.isWhatContentVisible()).toBe(false);
    });

    test('should switch to Use tab', async () => {
        await tabsPage.clickUse();
        expect(await tabsPage.isUseContentVisible()).toBe(true);
    });

    test('should verify More tab is disabled', async () => {
        expect(await tabsPage.isMoreTabDisabled()).toBe(true);
    });
});
