import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/Elements/textBoxPage';
import { textBoxData } from '../../utils/testData';

test.describe('Text Box Tests', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate('/text-box');
  });

  test('should submit valid data', async () => {
    await textBoxPage.fillForm(textBoxData.valid);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutputContains(textBoxData.valid.fullName);
    await textBoxPage.verifyOutputContains(textBoxData.valid.email);
    await textBoxPage.verifyOutputContains(textBoxData.valid.currentAddress);
    await textBoxPage.verifyOutputContains(textBoxData.valid.permanentAddress);
  });
});