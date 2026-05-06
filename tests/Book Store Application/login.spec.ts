import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/Book Store Application/loginPage';
import { bookStoreUser } from '../../utils/testData';

test.describe('Book Store Login Tests', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate('/login');
    });

    test('should show error for invalid credentials', async () => {
        await loginPage.login('invalidUser', 'wrongPassword');
        const error = await loginPage.getErrorMessage();
        expect(error).toContain('Invalid username or password!');
    });

    test('should navigate to new user registration', async () => {
        await loginPage.clickNewUser();
        expect(loginPage['page'].url()).toContain('register');
    });
});
