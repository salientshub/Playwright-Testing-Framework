// pages/Elements/brokenLinksImagesPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class BrokenLinksImagesPage extends BasePage {
    readonly validImage: Locator;
    readonly brokenImage: Locator;
    readonly validLink: Locator;
    readonly brokenLink: Locator;

    constructor(page: Page) {
        super(page);
        // Using user-facing locators based on adjacent text
        this.validImage = page.locator('p:has-text("Valid image") + img');
        this.brokenImage = page.locator('p:has-text("Broken image") + img');
        this.validLink = page.getByRole('link', { name: 'Click Here for Valid Link' });
        this.brokenLink = page.getByRole('link', { name: 'Click Here for Broken Link' });
    }

    async isImageBroken(locator: Locator): Promise<boolean> {
        return await locator.evaluate(async (img: HTMLImageElement) => {
            try {
                // decode() returns a promise that resolves when the image is fully decoded.
                // It will reject if the image is broken, empty, or fails to load.
                await img.decode();
                return false;
            } catch (error) {
                return true;
            }
        });
    }

    async clickValidLink() {
        await this.safeClick(this.validLink);
    }

    async clickBrokenLink() {
        await this.safeClick(this.brokenLink);
    }
}
