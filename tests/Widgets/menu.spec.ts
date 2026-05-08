import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/Widgets/menuPage';
import * as allure from 'allure-js-commons';

test.describe('Menu Tests', () => {
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        menuPage = new MenuPage(page);
        await menuPage.navigate('/menu');
    });

    test('should display menu items @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Menu');
        await allure.story('Display Menu Items');
        await allure.severity('critical');

        const count = await menuPage.getMenuItemCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should show sub items on hover @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Menu');
        await allure.story('Hover Sub Items');
        await allure.severity('normal');

        await menuPage.hoverMainItem2();
        await expect(menuPage.subItem1.first()).toBeVisible();
    });
});
