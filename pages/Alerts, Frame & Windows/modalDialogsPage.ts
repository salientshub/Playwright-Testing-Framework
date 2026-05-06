// pages/Alerts, Frame & Windows/modalDialogsPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class ModalDialogsPage extends BasePage {
    readonly smallModalButton: Locator;
    readonly largeModalButton: Locator;
    readonly smallModalCloseButton: Locator;
    readonly largeModalCloseButton: Locator;
    readonly modalBody: Locator;
    readonly modalTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.smallModalButton = page.locator('#showSmallModal');
        this.largeModalButton = page.locator('#showLargeModal');
        this.smallModalCloseButton = page.locator('#closeSmallModal');
        this.largeModalCloseButton = page.locator('#closeLargeModal');
        this.modalBody = page.locator('.modal-body');
        this.modalTitle = page.locator('.modal-title');
    }

    async openSmallModal() {
        await this.safeClick(this.smallModalButton);
    }

    async openLargeModal() {
        await this.safeClick(this.largeModalButton);
    }

    async closeSmallModal() {
        await this.safeClick(this.smallModalCloseButton);
    }

    async closeLargeModal() {
        await this.safeClick(this.largeModalCloseButton);
    }

    async getModalTitle(): Promise<string> {
        return (await this.modalTitle.textContent()) || '';
    }

    async getModalBodyText(): Promise<string> {
        return (await this.modalBody.textContent()) || '';
    }

    async isModalVisible(): Promise<boolean> {
        return await this.modalBody.isVisible();
    }
}
