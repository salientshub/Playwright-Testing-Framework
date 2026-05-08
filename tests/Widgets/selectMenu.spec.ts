import { test, expect } from '@playwright/test';
import { SelectMenuPage } from '../../pages/Widgets/selectMenuPage';
import { allure } from 'allure-js-commons';

test.describe('Select Menu Tests', () => {
    let selectPage: SelectMenuPage;

    test.beforeEach(async ({ page }) => {
        selectPage = new SelectMenuPage(page);
        await selectPage.navigate('/select-menu');
    });

    test('should select from old style menu @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Select Menu');
        await allure.story('Old Style Select');
        await allure.severity('critical');

        await selectPage.selectOldStyle('3');
        const value = await selectPage.getOldStyleValue();
        expect(value).toBe('3');
    });

    test('should select multiple from standard multi-select @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Select Menu');
        await allure.story('Multi Select');
        await allure.severity('normal');

        await selectPage.selectMultipleStandard(['volvo', 'audi']);
    });
});
