import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../../pages/Forms/practiceFormPage';
import { practiceFormData } from '../../utils/testData';

test.describe('Practice Form Tests', () => {
  let formPage: PracticeFormPage;

  test.beforeEach(async ({ page }) => {
    formPage = new PracticeFormPage(page);
    await formPage.navigate('/automation-practice-form');
  });

  test('should submit the form successfully', async () => {
    await formPage.fillForm(practiceFormData);
    await formPage.submit();
    expect(await formPage.isModalVisible()).toBe(true);
  });
});