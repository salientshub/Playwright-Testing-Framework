import { test, expect } from '@playwright/test';
import { ModalDialogsPage } from '../../pages/Alerts, Frame & Windows/modalDialogsPage';

test.describe('Modal Dialogs Tests', () => {
    let modalPage: ModalDialogsPage;

    test.beforeEach(async ({ page }) => {
        modalPage = new ModalDialogsPage(page);
        await modalPage.navigate('/modal-dialogs');
    });

    test('should open and close small modal', async () => {
        await modalPage.openSmallModal();
        expect(await modalPage.isModalVisible()).toBe(true);
        const title = await modalPage.getModalTitle();
        expect(title).toContain('Small Modal');
        await modalPage.closeSmallModal();
        await expect(modalPage.modalBody).toBeHidden();
    });

    test('should open and close large modal', async () => {
        await modalPage.openLargeModal();
        expect(await modalPage.isModalVisible()).toBe(true);
        const title = await modalPage.getModalTitle();
        expect(title).toContain('Large Modal');
        const body = await modalPage.getModalBodyText();
        expect(body.length).toBeGreaterThan(0);
        await modalPage.closeLargeModal();
    });
});
