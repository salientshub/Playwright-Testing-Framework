// pages/Book Store Application/loginPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class LoginPage extends BasePage {
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly newUserButton: Locator;
    readonly errorMessage: Locator;
    readonly logoutButton: Locator;
    readonly userNameValue: Locator;

    constructor(page: Page) {
        super(page);
        this.usernameInput = page.locator('#userName');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login');
        this.newUserButton = page.locator('#newUser');
        this.errorMessage = page.locator('#name');
        this.logoutButton = page.locator('#submit').filter({ hasText: 'Log out' });
        this.userNameValue = page.locator('#userName-value');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.safeClick(this.loginButton);
    }

    async getErrorMessage(): Promise<string> {
        return (await this.errorMessage.textContent()) || '';
    }

    async isLoggedIn(): Promise<boolean> {
        return await this.logoutButton.isVisible();
    }

    async getLoggedInUser(): Promise<string> {
        return (await this.userNameValue.textContent()) || '';
    }

    async clickNewUser() {
        await this.safeClick(this.newUserButton);
    }
}
