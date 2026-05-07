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
        this.section1Heading = page.locator('.accordion-item', { hasText: 'What is Lorem Ipsum?' });
        this.section1Content = this.section1Heading.locator('.accordion-collapse');
        this.section2Heading = page.locator('.accordion-item', { hasText: 'Where does it come from?' });
        this.section2Content = this.section2Heading.locator('.accordion-collapse');
        this.section3Heading = page.locator('.accordion-item', { hasText: 'Why do we use it?' });
        this.section3Content = this.section3Heading.locator('.accordion-collapse');
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
