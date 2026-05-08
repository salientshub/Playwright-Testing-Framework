import { test, expect } from '@playwright/test';
import { TabsPage } from '../../pages/Widgets/tabsPage';
import { allure } from 'allure-js-commons';

test.describe('Tabs Tests', () => {
    let tabsPage: TabsPage;

    test.beforeEach(async ({ page }) => {
        tabsPage = new TabsPage(page);
        await tabsPage.navigate('/tabs');
    });

    test('should show What tab by default @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tabs');
        await allure.story('Default Tab');
        await allure.severity('critical');

        expect(await tabsPage.isWhatContentVisible()).toBe(true);
    });

    test('should switch to Origin tab @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tabs');
        await allure.story('Switch to Origin');
        await allure.severity('normal');

        await tabsPage.clickOrigin();
        expect(await tabsPage.isOriginContentVisible()).toBe(true);
        expect(await tabsPage.isWhatContentVisible()).toBe(false);
    });

    test('should switch to Use tab @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tabs');
        await allure.story('Switch to Use');
        await allure.severity('normal');

        await tabsPage.clickUse();
        expect(await tabsPage.isUseContentVisible()).toBe(true);
    });

    test('should verify More tab is disabled @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Tabs');
        await allure.story('More Tab Disabled');
        await allure.severity('minor');

        expect(await tabsPage.isMoreTabDisabled()).toBe(true);
    });
});
