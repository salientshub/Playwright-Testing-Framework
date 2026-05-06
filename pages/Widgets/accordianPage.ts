// pages/Widgets/accordianPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class AccordianPage extends BasePage {
    readonly section1Heading: Locator;
    readonly section1Content: Locator;
    readonly section2Heading: Locator;
    readonly section2Content: Locator;
    readonly section3Heading: Locator;
    readonly section3Content: Locator;

    constructor(page: Page) {
        super(page);
        this.section1Heading = page.locator('#section1Heading');
        this.section1Content = page.locator('#section1Content');
        this.section2Heading = page.locator('#section2Heading');
        this.section2Content = page.locator('#section2Content');
        this.section3Heading = page.locator('#section3Heading');
        this.section3Content = page.locator('#section3Content');
    }

    async clickSection1() {
        await this.safeClick(this.section1Heading);
    }

    async clickSection2() {
        await this.safeClick(this.section2Heading);
    }

    async clickSection3() {
        await this.safeClick(this.section3Heading);
    }

    async isSection1Visible(): Promise<boolean> {
        return await this.section1Content.isVisible();
    }

    async isSection2Visible(): Promise<boolean> {
        return await this.section2Content.isVisible();
    }

    async isSection3Visible(): Promise<boolean> {
        return await this.section3Content.isVisible();
    }

    async getSection1Text(): Promise<string> {
        return (await this.section1Content.textContent()) || '';
    }
}
