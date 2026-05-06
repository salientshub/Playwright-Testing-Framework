import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../../pages/Widgets/selectMenuPage';

test.describe('Select Menu Tests', () => {
    let selectPage: SelectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectPage = new SelectMenuPage(page);
        await selectPage.navigate('/select-menu');
    });

    test('should select from old style menu', async () => {
        await selectPage.selectOldStyle('3');
        const value = await selectPage.getOldStyleValue();
        expect(value).toBe('3');
    });

    test('should select multiple from standard multi-select', async () => {
        await selectPage.selectMultipleStandard(['volvo', 'audi']);
    });
});
