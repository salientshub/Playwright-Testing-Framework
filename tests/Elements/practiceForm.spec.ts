import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../../pages/Forms/practiceFormPage';
import { practiceFormData } from '../../utils/testData';
import { allure } from 'allure-js-commons';

test.describe('Practice Form Tests', () => {
  let formPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new PracticeFormPage(page);
    await formPage.navigate('/automation-practice-form');
  });

  test('should submit the form successfully @sanity @elements', async () => {
    await allure.epic('Elements');
    await allure.feature('Practice Form');
    await allure.story('Submit Form');
    await allure.severity('critical');

    await formPage.fillForm(practiceFormData);
    await formPage.submit();
    expect(await formPage.isModalVisible()).toBe(true);
  });
});