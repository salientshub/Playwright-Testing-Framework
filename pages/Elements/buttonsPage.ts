// pages/Elements/buttonsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ButtonsPage extends BasePage {
    readonly doubleClickBtn: Locator;
    readonly rightClickBtn: Locator;
    readonly clickMeBtn: Locator;
    readonly doubleClickMsg: Locator;
    readonly rightClickMsg: Locator;
    readonly clickMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.doubleClickBtn = page.getByRole('button', { name: 'Double Click Me' });
        this.rightClickBtn = page.getByRole('button', { name: 'Right Click Me' });
        this.clickMeBtn = page.getByRole('button', { name: 'Click Me', exact: true });
        this.doubleClickMsg = page.locator('#doubleClickMessage');
        this.rightClickMsg = page.locator('#rightClickMessage');
        this.clickMsg = page.locator('#dynamicClickMessage');
    }

    async doubleClick() {
        await this.doubleClickBtn.dblclick();
    }

    async rightClick() {
        await this.rightClickBtn.click({ button: 'right' });
    }

    async singleClick() {
        await this.safeClick(this.clickMeBtn);
    }

    async getDoubleClickMessage(): Promise<string> {
        return (await this.doubleClickMsg.textContent()) || '';
    }

    async getRightClickMessage(): Promise<string> {
        return (await this.rightClickMsg.textContent()) || '';
    }

    async getClickMessage(): Promise<string> {
        return (await this.clickMsg.textContent()) || '';
    }
}