import { test, expect } from '@playwright/test';
import { AccordianPage } from '../../pages/Widgets/accordianPage';
import * as allure from 'allure-js-commons';

test.describe('Accordian Tests', () => {
    let accordianPage: AccordianPage;

    test.beforeEach(async ({ page }) => {
        accordianPage = new AccordianPage(page);
        await accordianPage.navigate('/accordian');
    });

    test('should show section 1 content by default @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Accordian');
        await allure.story('Default Section Visible');
        await allure.severity('critical');

        expect(await accordianPage.isSection1Visible()).toBe(true);
    });

    test('should toggle section 2 @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Accordian');
        await allure.story('Toggle Section 2');
        await allure.severity('normal');

        await accordianPage.clickSection2();
        expect(await accordianPage.isSection2Visible()).toBe(true);
        expect(await accordianPage.isSection1Visible()).toBe(false);
    });

    test('should toggle section 3 @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Accordian');
        await allure.story('Toggle Section 3');
        await allure.severity('normal');

        await accordianPage.clickSection3();
        expect(await accordianPage.isSection3Visible()).toBe(true);
        expect(await accordianPage.isSection1Visible()).toBe(false);
    });
});
