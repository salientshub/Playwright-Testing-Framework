// pages/Elements/webTablesPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class WebTablesPage extends BasePage {
    readonly addButton: Locator;
    readonly searchBox: Locator;
    readonly editButtons: Locator;
    readonly deleteButtons: Locator;
    readonly tableRows: Locator;

    // Registration form fields
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly emailInput: Locator;
    readonly ageInput: Locator;
    readonly salaryInput: Locator;
    readonly departmentInput: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.searchBox = page.locator('#searchBox');
        this.editButtons = page.locator('span[title="Edit"]');
        this.deleteButtons = page.locator('span[title="Delete"]');
        this.tableRows = page.locator('//*[@id="root"]/div/div/div/div[2]/div[1]/div[2]/table/tbody/tr');

        this.firstNameInput = page.locator('#firstName');
        this.lastNameInput = page.locator('#lastName');
        this.emailInput = page.locator('#userEmail');
        this.ageInput = page.locator('#age');
        this.salaryInput = page.locator('#salary');
        this.departmentInput = page.locator('#department');
        this.submitButton = page.locator('#submit');
    }

    async clickAdd() {
        await this.safeClick(this.addButton);
    }

    async fillUserForm(user: {
        firstName: string;
        lastName: string;
        email: string;
        age: string;
        salary: string;
        department: string;
    }) {
        await this.firstNameInput.fill(user.firstName);
        await this.lastNameInput.fill(user.lastName);
        await this.emailInput.fill(user.email);
        await this.ageInput.fill(user.age);
        await this.salaryInput.fill(user.salary);
        await this.departmentInput.fill(user.department);
    }

    async submitForm() {
        await this.safeClick(this.submitButton);
    }

    async searchUser(email: string) {
        await this.searchBox.fill(email);
        await this.searchBox.press('Enter');
    }

    async getUserCount(): Promise<number> {
        // Filter out empty rows (DemoQA table rows always exist but may be empty)
        const rows = this.tableRows.filter({ hasText: /[a-zA-Z0-9]/ });
        return await rows.count();
    }

    async deleteFirstUser() {
        const firstDelete = this.deleteButtons.first();
        await this.safeClick(firstDelete);
    }

    getUserRow(email: string): Locator {
        return this.page.locator(`.rt-tr-group:has-text("${email}")`);
    }
}