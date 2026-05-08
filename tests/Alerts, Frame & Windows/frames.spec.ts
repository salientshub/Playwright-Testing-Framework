import { test, expect } from '@playwright/test';
import { FramesPage } from '../../pages/Alerts, Frame & Windows/framesPage';
import { allure } from 'allure-js-commons';

test.describe('Frames Tests', () => {
    let framesPage: FramesPage;

    test.beforeEach(async ({ page }) => {
        framesPage = new FramesPage(page);
        await framesPage.navigate('/frames');
    });

    test('should read text from frame 1 @sanity @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Frames');
        await allure.story('Read Frame 1');
        await allure.severity('critical');

        const text = await framesPage.getFrame1Text();
        expect(text).toContain('This is a sample page');
    });

    test('should read text from frame 2 @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Frames');
        await allure.story('Read Frame 2');
        await allure.severity('normal');

        const text = await framesPage.getFrame2Text();
        expect(text).toContain('This is a sample page');
    });

    test('should verify frame 1 has dimensions @regression @afw', async () => {
        await allure.epic('Alerts, Frame & Windows');
        await allure.feature('Frames');
        await allure.story('Frame Dimensions');
        await allure.severity('minor');

        const dims = await framesPage.getFrame1Dimensions();
        expect(dims.width).toBeGreaterThan(0);
        expect(dims.height).toBeGreaterThan(0);
    });
});
