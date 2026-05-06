import { test, expect } from '@playwright/test';
import { BookStorePage } from '../../pages/Book Store Application/bookStorePage';

test.describe('Book Store Tests', () => {
    let bookStorePage: BookStorePage;

    test.setTimeout(60000); // DemoQA Book API can be very slow

    test.beforeEach(async ({ page }) => {
        bookStorePage = new BookStorePage(page);
        await bookStorePage.navigate('/books');
    });

    test('should display books', async () => {
        const count = await bookStorePage.getBookCount();
        expect(count).toBeGreaterThan(0);
    });

    test('should search for a book', async () => {
        await bookStorePage.searchBook('JavaScript');
        const titles = await bookStorePage.getBookTitles();
        const filtered = titles.filter(t => t.trim().length > 0);
        expect(filtered.length).toBeGreaterThan(0);
        expect(filtered.some(t => t.toLowerCase().includes('javascript'))).toBe(true);
    });

    test('should click on a book to view details', async () => {
        const titles = await bookStorePage.getBookTitles();
        const firstBook = titles.filter(t => t.trim().length > 0)[0];
        await bookStorePage.clickBookByTitle(firstBook);
        expect(bookStorePage['page'].url()).toContain('book');
    });
});
