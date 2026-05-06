import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class LoginPage extends BasePage {
  readonly username: Locator;
  readonly password: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.username = page.locator('#userName');
    this.password = page.locator('#password');
    this.loginButton = page.locator('#login');
    this.errorMessage = page.locator('#name');
  }

  async login(user: string, pwd: string) {
    await this.username.fill(user);
    await this.password.fill(pwd);
    await this.safeClick(this.loginButton);
  }
}