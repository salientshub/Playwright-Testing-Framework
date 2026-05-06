// pages/Elements/checkBoxPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class CheckBoxPage extends BasePage {
    readonly homeToggle: Locator;
    readonly homeCheckbox: Locator;
    readonly desktopCheckbox: Locator;
    readonly documentsCheckbox: Locator;
    readonly downloadsCheckbox: Locator;
    readonly resultText: Locator;

    constructor(page: Page) {
        super(page);
        // The expand/collapse arrow for Home node (if needed)
        this.homeToggle = page.locator('span.rc-tree-switcher.rc-tree-switcher_close');
        this.homeCheckbox = page.getByRole('checkbox', { name: 'Select Home' });
        this.desktopCheckbox = page.locator("//span[@aria-label='Select Desktop']");
        this.documentsCheckbox = page.getByRole('checkbox', { name: 'Select Documents' });
        this.downloadsCheckbox = page.getByRole('checkbox', { name: 'Select Downloads' });
        this.resultText = page.locator('#result');
    }

    async expandHome() {
        await this.homeToggle.click();
    }

    async checkHome() {
        await this.homeCheckbox.check();
    }

    async checkDesktop() {
        await this.desktopCheckbox.check();
    }
    async uncheckHome() {
        await this.homeCheckbox.uncheck();
    }

    async isHomeChecked(): Promise<boolean> {
        return await this.homeCheckbox.isChecked();
    }

    async isDesktopChecked(): Promise<boolean> {
        return await this.desktopCheckbox.isChecked();
    }

    async getSelectedNodes(): Promise<string> {
        return (await this.resultText.textContent()) || '';
    }
}