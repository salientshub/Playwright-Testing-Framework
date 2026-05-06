// pages/Elements/uploadDownloadPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class UploadDownloadPage extends BasePage {
    readonly downloadButton: Locator;
    readonly uploadInput: Locator;
    readonly uploadedFilePath: Locator;

    constructor(page: Page) {
        super(page);
        this.downloadButton = page.getByRole('button', { name: 'Download' });
        this.uploadInput = page.locator('#uploadFile');
        this.uploadedFilePath = page.locator('#uploadedFilePath');
    }

    async downloadFile() {
        const downloadPromise = this.page.waitForEvent('download');
        await this.safeClick(this.downloadButton);
        const download = await downloadPromise;
        return download;
    }

    async uploadFile(filePath: string) {
        await this.uploadInput.setInputFiles(filePath);
    }

    async getUploadedFileName(): Promise<string> {
        return (await this.uploadedFilePath.textContent()) || '';
    }
}