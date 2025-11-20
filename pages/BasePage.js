import { expect } from '@playwright/test';
export class BasePage {
    constructor(page) {
        this.page = page;
    }

    async click(selector) {
        await this.page.click(selector);
    }
    
    async type(selector, text) {
        await this.page.fill(selector, text);
    }

    async select(selector, value) {
        await this.page.selectOption(selector, value);
    }

    async check(selector) {
        const cb = this.page.locator(selector);
        if (await cb.isVisible()) await cb.check({ force: true })
    }
    async uncheck(selector) {
        await this.page.locator(selector).uncheck({ force: true });
    }
}
