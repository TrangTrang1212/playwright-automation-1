import { expect } from '@playwright/test';
export class BasePage {
    constructor(page) {
        this.page = page;
    }


    async goto(url) {
        await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    }

    async click(selector) {
        await this.page.click(selector);
    }
    async fill(selector, text) {
        await this.page.fill(selector, text);  
    }

    async selectOption(selector, value) {
        await this.page.selectOption(selector, value);
    }

    async getText(selector) {
        return await this.page.textContent(selector);
    }
    async expectVisible(selector) {
        await expect(this.page.locator(selector)).toBeVisible();
    }

    async expectText(selector, value) {
        await expect(this.page.locator(selector)).toHaveText(value);
    }  
}
module.exports = { BasePage };