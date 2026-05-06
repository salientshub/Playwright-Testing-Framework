import { test, expect } from '@playwright/test';
import { SliderPage } from '../../pages/Widgets/sliderPage';

test.describe('Slider Tests', () => {
    let sliderPage: SliderPage;

    test.beforeEach(async ({ page }) => {
        sliderPage = new SliderPage(page);
        await sliderPage.navigate('/slider');
    });

    test('should set slider value', async () => {
        await sliderPage.setSliderValue(75);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('75');
    });

    test('should set slider to minimum', async () => {
        await sliderPage.setSliderValue(0);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('0');
    });

    test('should set slider to maximum', async () => {
        await sliderPage.setSliderValue(100);
        const value = await sliderPage.getSliderValue();
        expect(value).toBe('100');
    });
});
