import { test, expect } from '@playwright/test';
import { UploadDownloadPage } from '../../pages/Elements/uploadDownloadPage';
import * as path from 'path';
import * as allure from 'allure-js-commons';

test.describe('Upload & Download Tests', () => {
  let uploadPage: UploadDownloadPage;

  test.beforeEach(async ({ page }) => {
    uploadPage = new UploadDownloadPage(page);
    await uploadPage.navigate('/upload-download');
  });

  test('should download a file @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Upload & Download');
    await allure.story('File Download');
    await allure.severity('critical');

    const download = await uploadPage.downloadFile();
    expect(download.suggestedFilename()).toBeTruthy();
  });

  test('should upload a file @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Upload & Download');
    await allure.story('File Upload');
    await allure.severity('critical');

    const filePath = path.join(__dirname, '../../test-data/sample.txt');
    await uploadPage.uploadFile(filePath);
    const uploadedName = await uploadPage.getUploadedFileName();
    expect(uploadedName).toContain('sample.txt');
  });
});