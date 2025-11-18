import { BasePage } from '../pages/BasePage.js';

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);
        this.url = 'https://sssg.stg.samsonite-asia.com/register';
        this.titleSelect = '#registration-form-title';
        this.firstNameInput = '#registration-form-fname';  
        this.lastNameInput = '#registration-form-lname';  
        this.phoneInput = '#registration-form-phone';  
        this.emailInput = '#registration-form-email';  
        this.passwordInput = '#registration-form-password';  
        this.confirmPasswordInput = '#registration-form-password-confirm';  
        this.dobDaySelect = '#day';  
        this.dobMonthSelect = 'select[name="month"]';  
        this.dobYearSelect = '#year';  
        this.dobCombining = '#dob-combining';
        this.termsCheckboxInput = '#accept-terms-condition';
        this.createAccountButton = 'button[data-onetag-type="signup"]';
    }
    async open() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }
    async fillRegisterCustomerDetailsForm(data) {
        if (data.title) {
            await this.page.selectOption(this.titleSelect, data.title);
        }
        if (data.firstName) {
            await this.page.fill(this.firstNameInput, data.firstName);
        }
        if (data.lastName) {
            await this.page.fill(this.lastNameInput, data.lastName);
        }
        if (data.phone) {
            await this.page.fill(this.phoneInput, data.phone);
        }
        if (data.email) {
            await this.page.fill(this.emailInput, data.email);
        }
        if (data.password) {
            await this.page.fill(this.passwordInput, data.password);
        }
        if (data.confirmPw) {
            await this.page.fill(this.confirmPasswordInput, data.confirmPw);
        }
        if (data.dob) {
            if (data.dob.day) {
                await this.page.selectOption(this.dobDaySelect, data.dob.day);
            }
            if (data.dob.month) {
                await this.page.selectOption(this.dobMonthSelect, data.dob.month);
            }
            if (data.dob.year) {
                await this.page.selectOption(this.dobYearSelect, data.dob.year);
            }
        }
        

    }
    async clearDOB() {
        await this.page.selectOption(this.dobDaySelect, '');
        await this.page.selectOption(this.dobMonthSelect, '');
        await this.page.selectOption(this.dobYearSelect, '');
    }
    async type(selector, text) {
        await this.page.fill(selector, text);
    }

    async clickCreateAccount() {
        await this.page.click(this.createAccountButton);
    }
    async selectDropdown(selector, value) {
        await this.page.selectOption(selector, value);
    }
    async checkTerms() {
    await this.page.evaluate(() => {
        const checkbox = document.querySelector('#accept-terms-condition');
        if (checkbox) checkbox.checked = true;
    });
}

    async uncheckTerms() {
        await this.page.locator(this.termsCheckboxInput).uncheck({ force: true });
    }
}