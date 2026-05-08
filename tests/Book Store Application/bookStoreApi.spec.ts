import { test, expect } from '@playwright/test';
import { ApiClient } from '../../utils/apiClient';
import { bookStoreUser } from '../../utils/testData';
import { allure } from 'allure-js-commons';

test.describe('Book Store API Tests', () => {
    let apiClient: ApiClient;

    test.beforeEach(async ({ request }) => {
        apiClient = new ApiClient(request);
    });

    test('should get all books list @sanity @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store API');
        await allure.story('Get All Books');
        await allure.severity('critical');

        const response = await apiClient.getBooks();
        expect(response.status()).toBe(200);
        const body = await response.json();
        expect(body.books).toBeDefined();
        expect(Array.isArray(body.books)).toBe(true);
        expect(body.books.length).toBeGreaterThan(0);
    });

    test('should get a specific book by ISBN @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store API');
        await allure.story('Get Book by ISBN');
        await allure.severity('normal');

        // First get all books to find a valid ISBN
        const booksResponse = await apiClient.getBooks();
        const booksBody = await booksResponse.json();
        const isbn = booksBody.books[0].isbn;

        // Fetch specific book
        const bookResponse = await apiClient.getBook(isbn);
        expect(bookResponse.status()).toBe(200);
        const bookBody = await bookResponse.json();
        expect(bookBody.isbn).toBe(isbn);
    });

    test('should fail to generate token with invalid credentials @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store API');
        await allure.story('Invalid Token Generation');
        await allure.severity('normal');

        const response = await apiClient.generateToken('invalidUser', 'wrongPassword123!');
        expect(response.status()).toBe(200); // DemoQA returns 200 with failed status in body
        const body = await response.json();
        expect(body.status).toBe('Failed');
        expect(body.result).toContain('User authorization failed');
    });
});
