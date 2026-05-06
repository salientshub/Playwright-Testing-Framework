// pages/Book Store Application/profilePage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ProfilePage extends BasePage {
    readonly userNameValue: Locator;
    readonly bookRows: Locator;
    readonly deleteAllBooksButton: Locator;
    readonly deleteAccountButton: Locator;
    readonly goToBookStoreButton: Locator;
    readonly searchBox: Locator;
    readonly logoutButton: Locator;
    readonly bookLinks: Locator;

    constructor(page: Page) {
        super(page);
        this.userNameValue = page.locator('#userName-value');
        this.bookRows = page.locator('.rt-tr-group');
        this.deleteAllBooksButton = page.getByRole('button', { name: 'Delete All Books' });
        this.deleteAccountButton = page.getByRole('button', { name: 'Delete Account' });
        this.goToBookStoreButton = page.getByRole('button', { name: 'Go To Book Store' });
        this.searchBox = page.locator('#searchBox');
        this.logoutButton = page.getByRole('button', { name: 'Log out' });
        this.bookLinks = page.locator('.rt-table a');
    }

    async getUserName(): Promise<string> {
        return (await this.userNameValue.textContent()) || '';
    }

    async getBookTitles(): Promise<string[]> {
        return await this.bookLinks.allTextContents();
    }

    async deleteAllBooks() {
        await this.safeClick(this.deleteAllBooksButton);
    }

    async goToBookStore() {
        await this.safeClick(this.goToBookStoreButton);
    }

    async logout() {
        await this.safeClick(this.logoutButton);
    }

    async searchBook(query: string) {
        await this.searchBox.fill(query);
    }
}
