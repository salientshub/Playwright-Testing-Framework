import { test, expect } from '@playwright/test';
import { DatePickerPage } from '../../pages/Widgets/datePickerPage';
import { allure } from 'allure-js-commons';

test.describe('Date Picker Tests', () => {
    let datePage: DatePickerPage;

    test.beforeEach(async ({ page }) => {
        datePage = new DatePickerPage(page);
        await datePage.navigate('/date-picker');
    });

    test('should set a date @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Date Picker');
        await allure.story('Set Date');
        await allure.severity('critical');

        await datePage.setDate('01/15/2025');
        const date = await datePage.getDate();
        expect(date).toContain('01/15/2025');
    });

    test('should set date and time @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Date Picker');
        await allure.story('Set Date and Time');
        await allure.severity('normal');

        await datePage.setDateTime('January 15, 2025 10:00 AM');
        const dateTime = await datePage.getDateTime();
        expect(dateTime).toBeTruthy();
    });
});
