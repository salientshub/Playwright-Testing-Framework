// pages/Book Store Application/bookStorePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class BookStorePage extends BasePage {
    readonly searchBox: Locator;
    readonly bookRows: Locator;
    readonly loginButton: Locator;
    readonly bookLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.searchBox = page.locator('#searchBox');
        this.bookRows = page.locator('.rt-tr-group');
        this.loginButton = page.locator('#login');
        this.bookLinks = page.locator('tbody tr').filter({ hasText: /[a-zA-Z0-9]/ });
    }

    async searchBook(query: string) {
        await this.searchBox.fill(query);
    }

    async getBookTitles(): Promise<string[]> {
        await this.bookLinks.locator('a').first().waitFor({ state: 'visible', timeout: 10000 }).catch(() => {});
        // Since bookLinks now points to the 'tr', we must locate the 'a' tag inside to get just the title
        return await this.bookLinks.locator('a').allTextContents();
    }
    
    async clickBookByTitle(title: string) {
        if (!title) {
            throw new Error('Book title must be provided and cannot be empty');
        }
        await this.page.getByRole('link', { name: title, exact: true }).click();
    }

    async getBookCount(): Promise<number> {
        await this.bookLinks.first().waitFor({ state: 'visible', timeout: 50000 });
        const count = await this.bookLinks.count();
        return count;
    }

    async goToLogin() {
        await this.safeClick(this.loginButton);
    }
}
