import { test, expect } from '@playwright/test';
import { TextBoxPage } from '../../pages/Elements/textBoxPage';
import { textBoxData } from '../../utils/testData';
import * as allure from 'allure-js-commons';

test.describe('Text Box Tests', () => {
  let textBoxPage: TextBoxPage;

  test.beforeEach(async ({ page }) => {
    textBoxPage = new TextBoxPage(page);
    await textBoxPage.navigate('/text-box');
  });

  test('should submit valid data @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Text Box');
    await allure.story('Submit Valid Data');
    await allure.severity('critical');

    await textBoxPage.fillForm(textBoxData.valid);
    await textBoxPage.submitForm();
    await textBoxPage.verifyOutputContains(textBoxData.valid.fullName);
    await textBoxPage.verifyOutputContains(textBoxData.valid.email);
    await textBoxPage.verifyOutputContains(textBoxData.valid.currentAddress);
    await textBoxPage.verifyOutputContains(textBoxData.valid.permanentAddress);
  });
});