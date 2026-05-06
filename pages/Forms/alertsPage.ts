import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class AlertsPage extends BasePage {
  readonly alertButton: Locator;
  readonly timerAlertButton: Locator;
  readonly confirmButton: Locator;
  readonly promptButton: Locator;
  readonly confirmResult: Locator;
  readonly promptResult: Locator;

  constructor(page: Page) {
    super(page);
    this.alertButton = page.getByRole('button', { name: 'Click me', exact: true });
    this.timerAlertButton = page.getByRole('button', { name: 'Click me', exact: true }).nth(1);
    this.confirmButton = page.getByRole('button', { name: 'Click me', exact: true }).nth(2);
    this.promptButton = page.getByRole('button', { name: 'Click me', exact: true }).nth(3);
    this.confirmResult = page.locator('#confirmResult');
    this.promptResult = page.locator('#promptResult');
  }

  async triggerAlert() {
    await this.alertButton.click();
  }

  async triggerConfirmAndAccept() {
    await this.handleDialog(true);
    await this.confirmButton.click();
  }

  async triggerPromptAndType(text: string) {
    await this.handleDialog(true, text);
    await this.promptButton.click();
  }
}