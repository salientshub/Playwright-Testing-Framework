// pages/Elements/linksPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class LinksPage extends BasePage {
    readonly homeLink: Locator;
    readonly createdLink: Locator;
    readonly noContentLink: Locator;
    readonly movedLink: Locator;
    readonly badRequestLink: Locator;
    readonly unauthorizedLink: Locator;
    readonly forbiddenLink: Locator;
    readonly notFoundLink: Locator;
    readonly linkResponse: Locator;

    constructor(page: Page) {
        super(page);
        this.homeLink = page.locator('#simpleLink');
        this.createdLink = page.getByRole('link', { name: 'Created' });
        this.noContentLink = page.getByRole('link', { name: 'No Content' });
        this.movedLink = page.getByRole('link', { name: 'Moved' });
        this.badRequestLink = page.getByRole('link', { name: 'Bad Request' });
        this.unauthorizedLink = page.getByRole('link', { name: 'Unauthorized' });
        this.forbiddenLink = page.getByRole('link', { name: 'Forbidden' });
        this.notFoundLink = page.getByRole('link', { name: 'Not Found' });
        this.linkResponse = page.locator('#linkResponse');
    }

    async clickHomeLink() {
        await this.safeClick(this.homeLink);
    }

    async clickCreatedLink() {
        await this.safeClick(this.createdLink);
    }

    async getLinkResponse(): Promise<string> {
        return (await this.linkResponse.textContent()) || '';
    }
}