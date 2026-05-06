import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class TextBoxPage extends BasePage {
    // Locators
    readonly fullNameInput: Locator;
    readonly emailInput: Locator;
    readonly currentAddressInput: Locator;
    readonly permanentAddressInput: Locator;
    readonly submitButton: Locator;
    readonly outputDiv: Locator;

    constructor(page: Page) {
        super(page);
        this.fullNameInput = page.locator('#userName');
        this.emailInput = page.locator('#userEmail');
        this.currentAddressInput = page.locator('#currentAddress');
        this.permanentAddressInput = page.locator('#permanentAddress');
        this.submitButton = page.locator('#submit');
        this.outputDiv = page.locator('#output');
    }

    // Actions
    async fillForm(data: {
        fullName: string;
        email: string;
        currentAddress: string;
        permanentAddress: string;
    }) {
        await this.fullNameInput.fill(data.fullName);
        await this.emailInput.fill(data.email);
        await this.currentAddressInput.fill(data.currentAddress);
        await this.permanentAddressInput.fill(data.permanentAddress);
    }

    async submitForm() {
        await this.submitButton.click();
    }

    async getOutputText(): Promise<string> {
        return await this.outputDiv.innerText();
    }

    async verifyOutputContains(text: string) {
        await expect(this.outputDiv).toContainText(text);
    }
}