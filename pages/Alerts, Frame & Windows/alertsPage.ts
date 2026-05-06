// pages/Alerts, Frame & Windows/alertsPage.ts
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
        this.alertButton = page.locator('#alertButton');
        this.timerAlertButton = page.locator('#timerAlertButton');
        this.confirmButton = page.locator('#confirmButton');
        this.promptButton = page.locator('#promtButton');
        this.confirmResult = page.locator('#confirmResult');
        this.promptResult = page.locator('#promptResult');
    }

    async triggerAlert() {
        await this.safeClick(this.alertButton);
    }

    async triggerTimerAlert() {
        await this.safeClick(this.timerAlertButton);
    }

    async triggerConfirmAndAccept() {
        await this.handleDialog(true);
        await this.safeClick(this.confirmButton);
    }

    async triggerConfirmAndDismiss() {
        await this.handleDialog(false);
        await this.safeClick(this.confirmButton);
    }

    async triggerPromptAndType(text: string) {
        await this.handleDialog(true, text);
        await this.safeClick(this.promptButton);
    }

    async getConfirmResult(): Promise<string> {
        return (await this.confirmResult.textContent()) || '';
    }

    async getPromptResult(): Promise<string> {
        return (await this.promptResult.textContent()) || '';
    }
}
