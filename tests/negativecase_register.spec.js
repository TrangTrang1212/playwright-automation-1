import { test } from '../fixtures/newUser.js'; 
import {  
  expectFieldError, 
  expectNoError 
} from '../helpers/register.js';
import { RegisterPage } from '../pages/RegisterPage.js';    


test.describe('Register Fail',()=> {
    let register;
    test.beforeEach(async ({ page }) => {
    register = new RegisterPage(page);
    await register.open();
    });

    test('Click "Create account" button with empty required fields', async({page}) => {
        await register.clickCreateAccount();
        const L = register.locators;
        await expectFieldError(page, L.title, 'Please select an item in the list');
        await expectFieldError(page, L.firstName, 'Please fill out this field.');
        await expectFieldError(page, L.lastName, 'Please fill out this field.');
        await expectFieldError(page, L.phone, 'Please fill out this field.');
        //await expectFieldError(page, L.dobDay, 'The date is invalid');
        await expectFieldError(page, L.email, 'Please fill out this field.');
        await expectFieldError(page, L.password, 'Please fill out this field.');
        await expectFieldError(page, L.confirmPassword, 'Please fill out this field.');
        await expectFieldError(page, L.terms, 'Please check this box if you want to proceed.');
        
    });

    test('Missing Title', async({page, newUser}) => {
        await register.fillRegisterCustomerDetailsForm({...newUser, title: ''});
        await register.acceptTerms();

        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.title, 'Please select an item in the list');

        // Các field khác không có lỗi
        const noErrorFields = [
            register.locators.firstName,
            register.locators.lastName,
            register.locators.phone,
            register.locators.email,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms 
        ];
        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Missing First Name', async ({ page, newUser }) => {
        
        await register.fillRegisterCustomerDetailsForm({...newUser, firstName: ''});
        await register.acceptTerms();

        await register.clickCreateAccount();
        
        await expectFieldError(page, register.locators.firstName, 'Please fill out this field.');

        // Các field khác không có lỗi
        const noErrorFields = [
            register.locators.title,
            register.locators.lastName,
            register.locators.phone,
            register.locators.email,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Missing Last Name', async ({ page, newUser }) => {

        await register.fillRegisterCustomerDetailsForm({...newUser, lastName: ''});
        await register.acceptTerms();

        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.lastName, 'Please fill out this field.');
        
        // Các field khác không có lỗi
        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.phone,
            register.locators.email,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);

    });

    test('Missing Phone Number', async ({ page, newUser }) => {
        await register.fillRegisterCustomerDetailsForm({...newUser, phone: ''});
        await register.acceptTerms();

        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.phone, 'Please fill out this field.');

        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.lastName,
            register.locators.email,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });
/*
    test('Click "Create account" button without date of birth', async ({ page, newUser }) => {
        await register.fillRegisterCustomerDetailsForm(newUser);
        await register.page.selectOption(register.locators.dobMonth, '');
        await register.page.selectOption(register.locators.dobYear, '');
        await register.acceptTerms();

        await register.clickCreateAccount();


        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.lastName,         
            register.locators.phone,
            register.locators.email,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });
*/
    test('Missing Email', async ({ page, newUser }) => {

        await register.fillRegisterCustomerDetailsForm({...newUser, email: ''});
        await register.acceptTerms();

        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.email, 'Please fill out this field.');

        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.lastName,
            register.locators.phone,
            register.locators.password,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);   
    });

    test('Missing Password', async ({ page, newUser }) => {

        await register.fillRegisterCustomerDetailsForm({...newUser, password: ''});
        await register.acceptTerms();
        
        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.password, 'Please fill out this field.');
        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.lastName,
            register.locators.phone,
            register.locators.email,
            register.locators.confirmPassword,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Invalid confirm password', async ({ page, newUser }) => {
        await register.fillRegisterCustomerDetailsForm({...newUser, confirmPassword: newUser.confirmPassword_error});
        await register.acceptTerms();

        await register.clickCreateAccount();

        await expectFieldError(page, register.locators.confirmPassword, 'Does not match the password');
        const noErrorFields = [
            register.locators.title,
            register.locators.firstName,
            register.locators.lastName,
            register.locators.phone,
            register.locators.email,
            register.locators.password,
            register.locators.dobDay,
            register.locators.terms
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
  });
});