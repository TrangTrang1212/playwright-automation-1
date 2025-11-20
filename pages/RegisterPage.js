import { BasePage } from '../pages/BasePage.js';

export class RegisterPage extends BasePage {
    constructor(page) {
        super(page);

        this.url = '/register';

         this.locators = {
            title: '#registration-form-title',
            firstName: '#registration-form-fname', 
            lastName: '#registration-form-lname', 
            phone: '#registration-form-phone', 
            email: '#registration-form-email',  
            password: '#registration-form-password',  
            confirmPassword: '#registration-form-password-confirm',  
            dobDay: '#day',  
            dobMonth: 'select[name="month"]',  
            dobYear: '#year',  
            terms: '#accept-terms-condition',
            createAccount: 'button[data-onetag-type="signup"]'
    };
    }

    async open() {
        await this.page.goto(this.url, { waitUntil: 'domcontentloaded' });
    }
    async fillRegisterCustomerDetailsForm(data = {}) {
       const L = this.locators;

        if (data.title !== undefined) await this.select(L.title, data.title);
        if (data.firstName !== undefined) await this.type(L.firstName, data.firstName);
        if (data.lastName !== undefined) await this.type(L.lastName, data.lastName);
        if (data.phone !== undefined) await this.type(L.phone, data.phone);
        if (data.email !== undefined) await this.type(L.email, data.email);
        if (data.password !== undefined) await this.type(L.password, data.password);

        if (data.confirmPassword !== undefined)
        await this.type(L.confirmPassword, data.confirmPassword);

        if (data.dob) {
            if (data.dob.day !== undefined) await this.select(L.dobDay, data.dob.day);
            if (data.dob.month !== undefined) await this.select(L.dobMonth, data.dob.month);
            if (data.dob.year !== undefined) await this.select(L.dobYear, data.dob.year);
        }
    }
    
    async clickCreateAccount() {
        await this.page.click(this.locators.createAccount);
    }

    async acceptTerms() {
        await this.check(this.locators.terms);
    };
}
