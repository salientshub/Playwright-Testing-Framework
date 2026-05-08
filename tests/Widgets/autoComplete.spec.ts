import { test, expect } from '@playwright/test';
import { AutoCompletePage } from '../../pages/Widgets/autoCompletePage';
import * as allure from 'allure-js-commons';

test.describe('Auto Complete Tests', () => {
    let autoPage: AutoCompletePage;

    test.beforeEach(async ({ page }) => {
        autoPage = new AutoCompletePage(page);
        await autoPage.navigate('/auto-complete');
    });

    test('should select single color @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Auto Complete');
        await allure.story('Single Color Selection');
        await allure.severity('critical');

        await autoPage.typeSingleColor('Re');
        const value = await autoPage.getSingleValue();
        expect(value).toContain('Red');
    });

    test('should select multiple colors @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Auto Complete');
        await allure.story('Multiple Color Selection');
        await allure.severity('normal');

        await autoPage.typeMultipleColor('Bl');
        await autoPage.typeMultipleColor('Gr');
        const values = await autoPage.getMultipleValues();
        expect(values.length).toBeGreaterThanOrEqual(2);
    });
});
