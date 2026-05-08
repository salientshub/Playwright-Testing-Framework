import { test, expect } from '@playwright/test';
import { SelectablePage } from '../../pages/Interactions/selectablePage';
import * as allure from 'allure-js-commons';

test.describe('Selectable Tests', () => {
    let selectablePage: SelectablePage;

    test.beforeEach(async ({ page }) => {
        selectablePage = new SelectablePage(page);
        await selectablePage.navigate('/selectable');
    });

    test('should select list items @sanity @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Selectable');
        await allure.story('Select List Items');
        await allure.severity('critical');

        await selectablePage.selectListItem(0);
        await selectablePage.selectListItem(2);
        const selected = await selectablePage.getSelectedListItems();
        expect(selected.length).toBe(2);
    });

    test('should deselect list item on second click @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Selectable');
        await allure.story('Deselect List Item');
        await allure.severity('normal');

        await selectablePage.selectListItem(0);
        await selectablePage.selectListItem(0);
        const selected = await selectablePage.getSelectedListItems();
        expect(selected.length).toBe(0);
    });

    test('should select grid items @regression @interactions', async () => {
        await allure.epic('Interactions');
        await allure.feature('Selectable');
        await allure.story('Select Grid Items');
        await allure.severity('normal');

        await selectablePage.switchToGrid();
        await selectablePage.selectGridItem(0);
        const selected = await selectablePage.getSelectedGridItems();
        expect(selected.length).toBe(1);
    });
});
