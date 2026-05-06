// pages/Widgets/selectMenuPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class SelectMenuPage extends BasePage {
    readonly selectValue: Locator;
    readonly selectOne: Locator;
    readonly oldStyleSelect: Locator;
    readonly multiSelectDropdown: Locator;
    readonly standardMultiSelect: Locator;

    constructor(page: Page) {
        super(page);
        this.selectValue = page.locator('#withOptGroup');
        this.selectOne = page.locator('#selectOne');
        this.oldStyleSelect = page.locator('#oldSelectMenu');
        this.multiSelectDropdown = page.locator('#selectMenuContainer .css-2b097c-container').last();
        this.standardMultiSelect = page.locator('#cars');
    }

    async selectValueOption(text: string) {
        await this.selectValue.click();
        await this.page.getByText(text, { exact: true }).click();
    }

    async selectOneOption(text: string) {
        await this.selectOne.click();
        await this.page.getByText(text, { exact: true }).click();
    }

    async selectOldStyle(value: string) {
        await this.oldStyleSelect.selectOption(value);
    }

    async selectMultipleStandard(values: string[]) {
        await this.standardMultiSelect.selectOption(values);
    }

    async getOldStyleValue(): Promise<string> {
        return await this.oldStyleSelect.inputValue();
    }
}
