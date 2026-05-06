import { test, expect } from '@playwright/test';
import { SelectablePage } from '../../pages/Interactions/selectablePage';

test.describe('Selectable Tests', () => {
    let selectablePage: SelectablePage;

    test.beforeEach(async ({ page }) => {
        selectablePage = new SelectablePage(page);
        await selectablePage.navigate('/selectable');
    });

    test('should select list items', async () => {
        await selectablePage.selectListItem(0);
        await selectablePage.selectListItem(2);
        const selected = await selectablePage.getSelectedListItems();
        expect(selected.length).toBe(2);
    });

    test('should deselect list item on second click', async () => {
        await selectablePage.selectListItem(0);
        await selectablePage.selectListItem(0);
        const selected = await selectablePage.getSelectedListItems();
        expect(selected.length).toBe(0);
    });

    test('should select grid items', async () => {
        await selectablePage.switchToGrid();
        await selectablePage.selectGridItem(0);
        const selected = await selectablePage.getSelectedGridItems();
        expect(selected.length).toBe(1);
    });
});
