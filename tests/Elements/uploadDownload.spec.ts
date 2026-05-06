import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../../pages/Elements/uploadDownloadPage';
import * as path from 'path';

test.describe('Upload & Download Tests', () => {
  let uploadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadPage = new UploadDownloadPage(page);
    await uploadPage.navigate('/upload-download');
  });

  test('should download a file', async () => {
    const download = await uploadPage.downloadFile();
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('should upload a file', async () => {
    const filePath = path.join(__dirname, '../../test-data/sample.txt');
    await uploadPage.uploadFile(filePath);
    const uploadedName = await uploadPage.getUploadedFileName();
    expect(uploadedName).toContain('sample.txt');
  });
});