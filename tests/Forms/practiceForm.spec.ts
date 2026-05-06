import { test, expect } from '@playwright/test';
import { PracticeFormPage } from '../../pages/Forms/practiceFormPage';
import { practiceFormData } from '../../utils/testData';

test.describe('Practice Form Tests', () => {
    let formPage: PracticeFormPage;

    test.beforeEach(async ({ page }) => {
        formPage = new PracticeFormPage(page);
        await formPage.navigate('/automation-practice-form');
    });

    test('should submit the form with all fields', async () => {
        await formPage.fillForm(practiceFormData);
        await formPage.submit();
        expect(await formPage.isModalVisible()).toBe(true);
    });

    test('should submit form with required fields only', async () => {
        await formPage.fillForm({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@test.com',
            mobile: '1234567890',
            currentAddress: '123 Test St',
        });
        await formPage.submit();
        expect(await formPage.isModalVisible()).toBe(true);
    });
});
