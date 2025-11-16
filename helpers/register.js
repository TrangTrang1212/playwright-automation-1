import { expect } from '@playwright/test';

// Điền tất cả field hợp lệ
export async function fillAllFields(page, user) {
    await page.selectOption('#registration-form-title', user.title);
    await page.fill('#registration-form-fname', user.firstName);
    await page.fill('#registration-form-lname', user.lastName);
    await page.fill('#registration-form-phone', user.phone);
    await page.fill('#registration-form-email', user.email);
    await page.fill('#registration-form-password', user.password);
    await page.fill('#registration-form-password-confirm', user.confirmPw);

    await page.selectOption('#day', user.dob.day);
    await page.selectOption('select[name="month"]', user.dob.month);
    await page.selectOption('#year', user.dob.year);

    await page.locator('label[for="accept-terms-condition"]').setChecked(true);
}

// Check 1 field bị lỗi
export async function expectFieldError(page, selector, expectedText) {
    const error = page.locator(`${selector} ~ .invalid-feedback`);
    await expect(error).toHaveText(expectedText);
}

// Check 1 field không có lỗi
export async function expectNoError(page, selector) {
    const error = page.locator(selector).locator('.. >> .invalid-feedback');
    await expect(error).toBeHidden();
}
