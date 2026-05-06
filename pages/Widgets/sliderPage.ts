// pages/Widgets/sliderPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SliderPage extends BasePage {
    readonly slider: Locator;
    readonly sliderValue: Locator;

    constructor(page: Page) {
        super(page);
        this.slider = page.locator('.range-slider');
        this.sliderValue = page.locator('#sliderValue');
    }

    async setSliderValue(value: number) {
        await this.slider.fill(String(value));
    }

    async getSliderValue(): Promise<string> {
        return await this.sliderValue.inputValue();
    }
}
