import { test, expect } from '@playwright/test';
import { NestedFramesPage } from '../../pages/Alerts, Frame & Windows/nestedFramesPage';
import { allure } from 'allure-js-commons';

test.describe('Nested Frames Tests', () => {
    let nestedPage: NestedFramesPage;

    test.beforeEach(async ({ page }) => {
        nestedPage = new NestedFramesPage(page);
        await nestedPage.navigate('/nestedframes');
    });

    test('should read parent frame text @sanity @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Nested Frames');
        await allure.story('Read Parent Frame');
        await allure.severity('critical');

        const text = await nestedPage.getParentFrameText();
        expect(text).toContain('Parent frame');
    });

    test('should read child frame text @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Nested Frames');
        await allure.story('Read Child Frame');
        await allure.severity('normal');

        const text = await nestedPage.getChildFrameText();
        expect(text).toContain('Child Iframe');
    });
});
