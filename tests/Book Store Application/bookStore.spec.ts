import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/Book Store Application/bookStorePage';
import * as allure from 'allure-js-commons';

test.describe('Book Store Tests', () => {
    let bookStorePage: BookStorePage;

    test.setTimeout(60000); // DemoQA Book API can be very slow

    test.beforeEach(async ({ page }) => {
        bookStorePage = new BookStorePage(page);
        await bookStorePage.navigate('/books');
    });

    test('should display books @sanity @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store');
        await allure.story('Display Books');
        await allure.severity('critical');

        const count = await bookStorePage.getBookCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should search for a book @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store');
        await allure.story('Search Book');
        await allure.severity('normal');

        await bookStorePage.searchBook('JavaScript');
        const titles = await bookStorePage.getBookTitles();
        const filtered = titles.filter(t => t.trim().length > 0);
        expect(filtered.length).toBeGreaterThan(0);
        expect(filtered.some(t => t.toLowerCase().includes('javascript'))).toBe(true);
    });

    test('should click on a book to view details @regression @bookstore', async () => {
        await allure.epic('Book Store Application');
        await allure.feature('Book Store');
        await allure.story('View Book Details');
        await allure.severity('normal');

        const titles = await bookStorePage.getBookTitles();
        const firstBook = titles.filter(t => t.trim().length > 0)[0];
        await bookStorePage.clickBookByTitle(firstBook);
        expect(bookStorePage['page'].url()).toContain('book');
    });
});
