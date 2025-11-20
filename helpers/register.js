import { expect } from '@playwright/test';


// Check 1 field bị lỗi
export async function expectFieldError(page, selector, expectedText) {
    const error = page.locator(`${selector} ~ .invalid-feedback`);
    await expect(error).toHaveText(expectedText);
}

// Check 1 field không có lỗi
export async function expectNoError(page, selector) {
    const error = page.locator(`${selector} ~ .invalid-feedback`);
    await expect(error).toBeHidden();
}
