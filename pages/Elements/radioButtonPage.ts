// pages/Elements/radioButtonPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class RadioButtonPage extends BasePage {
    readonly yesRadio: Locator;
    readonly impressiveRadio: Locator;
    readonly noRadio: Locator;   // disabled
    readonly successMessage: Locator;

    constructor(page: Page) {
        super(page);
        this.yesRadio = page.getByRole('radio', { name: 'Yes' });
        this.impressiveRadio = page.getByRole('radio', { name: 'Impressive' });
        this.noRadio = page.getByRole('radio', { name: 'No' });
        this.successMessage = page.locator('.text-success');
    }

    async selectYes() {
        await this.yesRadio.check({ force: true });
    }

    async selectImpressive() {
        await this.impressiveRadio.check({ force: true });
    }

    async getSelectedValue(): Promise<string | null> {
        if (await this.yesRadio.isChecked()) return 'Yes';
        if (await this.impressiveRadio.isChecked()) return 'Impressive';
        return null;
    }

    async getSuccessMessage(): Promise<string> {
        return (await this.successMessage.textContent()) || '';
    }
}