import { test, expect } from '@playwright/test';
import { MenuPage } from '../../pages/Widgets/menuPage';

test.describe('Menu Tests', () => {
    let menuPage: MenuPage;

    test.beforeEach(async ({ page }) => {
        menuPage = new MenuPage(page);
        await menuPage.navigate('/menu');
    });

    test('should display menu items', async () => {
        const count = await menuPage.getMenuItemCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should show sub items on hover', async () => {
        await menuPage.hoverMainItem2();
        await expect(menuPage.subItem1.first()).toBeVisible();
    });
});
