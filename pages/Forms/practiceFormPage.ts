// pages/Forms/practiceFormPage.ts
import { Page, Locator } from '@playwright/test';
import { BasePage } from '../../BasePage';

export class PracticeFormPage extends BasePage {
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly email: Locator;
    readonly genderMale: Locator;
    readonly genderFemale: Locator;
    readonly genderOther: Locator;
    readonly mobile: Locator;
    readonly dateOfBirth: Locator;
    readonly subjectsInput: Locator;
    readonly hobbiesSports: Locator;
    readonly hobbiesReading: Locator;
    readonly hobbiesMusic: Locator;
    readonly pictureUpload: Locator;
    readonly currentAddress: Locator;
    readonly stateDropdown: Locator;
    readonly cityDropdown: Locator;
    readonly submitButton: Locator;
    readonly successModal: Locator;
    readonly modalCloseButton: Locator;
    readonly modalTable: Locator;

    constructor(page: Page) {
        super(page);
        this.firstName = page.locator('#firstName');
        this.lastName = page.locator('#lastName');
        this.email = page.locator('#userEmail');
        this.genderMale = page.locator('label[for="gender-radio-1"]');
        this.genderFemale = page.locator('label[for="gender-radio-2"]');
        this.genderOther = page.locator('label[for="gender-radio-3"]');
        this.mobile = page.locator('#userNumber');
        this.dateOfBirth = page.locator('#dateOfBirthInput');
        this.subjectsInput = page.locator('#subjectsInput');
        this.hobbiesSports = page.locator('label[for="hobbies-checkbox-1"]');
        this.hobbiesReading = page.locator('label[for="hobbies-checkbox-2"]');
        this.hobbiesMusic = page.locator('label[for="hobbies-checkbox-3"]');
        this.pictureUpload = page.locator('#uploadPicture');
        this.currentAddress = page.locator('#currentAddress');
        this.stateDropdown = page.locator('#state');
        this.cityDropdown = page.locator('#city');
        this.submitButton = page.locator('#submit');
        this.successModal = page.locator('.modal-content');
        this.modalCloseButton = page.locator('#closeLargeModal');
        this.modalTable = page.locator('.table-responsive table');
    }

    async fillForm(data: {
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
        dateOfBirth?: string;
        subjects?: string[];
        hobbies?: string[];
        picture?: string;
        currentAddress: string;
        state?: string;
        city?: string;
    }) {
        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.genderMale.click();
        await this.mobile.fill(data.mobile);

        if (data.dateOfBirth) {
            await this.dateOfBirth.click();
            await this.dateOfBirth.fill(data.dateOfBirth);
            await this.dateOfBirth.press('Enter');
        }

        if (data.subjects) {
            for (const subject of data.subjects) {
                await this.subjectsInput.fill(subject);
                await this.subjectsInput.press('Enter');
            }
        }

        if (data.hobbies) {
            if (data.hobbies.includes('Sports')) await this.hobbiesSports.click();
            if (data.hobbies.includes('Reading')) await this.hobbiesReading.click();
            if (data.hobbies.includes('Music')) await this.hobbiesMusic.click();
        }

        if (data.picture) {
            await this.pictureUpload.setInputFiles(`test-data/${data.picture}`);
        }

        await this.currentAddress.fill(data.currentAddress);

        if (data.state) {
            await this.stateDropdown.click();
            await this.page.getByText(data.state, { exact: true }).click();
        }
        if (data.city) {
            await this.cityDropdown.click();
            await this.page.getByText(data.city, { exact: true }).click();
        }
    }

    async submit() {
        await this.safeClick(this.submitButton);
    }

    async isModalVisible(): Promise<boolean> {
        return await this.successModal.isVisible();
    }

    async closeModal() {
        await this.safeClick(this.modalCloseButton);
    }

    async getModalTableText(): Promise<string> {
        return (await this.modalTable.textContent()) || '';
    }
}