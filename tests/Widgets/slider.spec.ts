import { test, expect } from '@playwright/test';
import { SliderPage } from '../../pages/Widgets/sliderPage';
import { allure } from 'allure-js-commons';

test.describe('Slider Tests', () => {
    let sliderPage: SliderPage;

    test.beforeEach(async ({ page }) => {
        sliderPage = new SliderPage(page);
        await sliderPage.navigate('/slider');
    });

    test('should set slider value @sanity @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Slider');
        await allure.story('Set Slider Value');
        await allure.severity('critical');

        await sliderPage.setSliderValue(75);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('75');
    });

    test('should set slider to minimum @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Slider');
        await allure.story('Slider Minimum');
        await allure.severity('normal');

        await sliderPage.setSliderValue(0);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('0');
    });

    test('should set slider to maximum @regression @widgets', async () => {
        await allure.epic('Widgets');
        await allure.feature('Slider');
        await allure.story('Slider Maximum');
        await allure.severity('normal');

        await sliderPage.setSliderValue(100);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('100');
    });
});
