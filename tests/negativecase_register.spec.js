import { test } from '../fixtures/newUser.js'; 
import {  
  expectFieldError, 
  expectNoError 
} from '../helpers/register.js';
import { RegisterPage } from '../pages/RegisterPage.js';    


test.describe('Register Fail',()=> {

    test.beforeEach(async ({ page }) => {
    const registerPage = new RegisterPage(page);
    await registerPage.open();
    });

    test('Click "Create account" button with empty required fields', async({page}) => {
        const registerPage = new RegisterPage(page);
        
        await registerPage.clickCreateAccount();

        await expectFieldError(page, registerPage.titleSelect, 'Please select an item in the list');
        await expectFieldError(page, registerPage.firstNameInput, 'Please fill out this field.');
        await expectFieldError(page, registerPage.lastNameInput, 'Please fill out this field.');
        await expectFieldError(page, registerPage.phoneInput, 'Please fill out this field.');
        //await expectFieldError(page, registerPage.dobDaySelect, 'The date is invalid');
        await expectFieldError(page, registerPage.emailInput, 'Please fill out this field.');
        await expectFieldError(page, registerPage.passwordInput, 'Please fill out this field.');
        await expectFieldError(page, registerPage.confirmPasswordInput, 'Please fill out this field.');
        await expectFieldError(page, registerPage.termsCheckboxInput, 'Please check this box if you want to proceed.');
        
    });

    test('Click "Create account" button without title', async({page, newUser}) => {
        
        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm({...newUser, title: ''});
       await registerPage.checkTerms();
        await registerPage.clickCreateAccount();

        await expectFieldError(page, registerPage.titleSelect, 'Please select an item in the list');

        // Các field khác không có lỗi
        const noErrorFields = [
            registerPage.firstNameInput,
            registerPage.lastNameInput,
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];
        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Click "Create account" button without firstname', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        
        await registerPage.fillRegisterCustomerDetailsForm({...newUser, firstName: ''});
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();
        await expectFieldError(page, registerPage.firstNameInput, 'Please fill out this field.');

        // Các field khác không có lỗi
        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.lastNameInput,
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Click "Create account" button without Lastname', async ({ page, newUser }) => {

        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm({...newUser, lastName: ''});
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();
        await expectFieldError(page, registerPage.lastNameInput, 'Please fill out this field.');
        
        // Các field khác không có lỗi
        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);

    });

    test('Click "Create account" button without Phone Number', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        
        await registerPage.fillRegisterCustomerDetailsForm({...newUser, phone: ''});
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();
        await expectFieldError(page, registerPage.phoneInput, 'Please fill out this field.');

        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.lastNameInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });

    /*test('Click "Create account" button without date of birth', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm(newUser);
        await registerPage.page.selectOption(registerPage.dobMonthSelect, '');
        await registerPage.page.selectOption(registerPage.dobYearSelect, '');
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();


        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.lastNameInput,         
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });
*/
    test('Click "Create account" button without email', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm({...newUser, email: ''});
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();

        await expectFieldError(page, registerPage.emailInput, 'Please fill out this field.');
        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.lastNameInput,
            registerPage.phoneInput,
            registerPage.passwordInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);   
    });

    test('Click "Create account" button without password', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm(newUser);
        
        await registerPage.type('#registration-form-password', '');
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();

        await expectFieldError(page, registerPage.passwordInput, 'Please fill out this field.');
        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.lastNameInput,
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.confirmPasswordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
    });

    test('Click "Create account" button with invalid password', async ({ page, newUser }) => {
        const registerPage = new RegisterPage(page);
        await registerPage.fillRegisterCustomerDetailsForm(newUser);
        await registerPage.type('#registration-form-password-confirm', newUser.confirmPw_error);
        await registerPage.checkTerms();
        await registerPage.clickCreateAccount();

        await expectFieldError(page, registerPage.confirmPasswordInput, 'Does not match the password');
        const noErrorFields = [
            registerPage.titleSelect,
            registerPage.firstNameInput,
            registerPage.lastNameInput,
            registerPage.phoneInput,
            registerPage.emailInput,
            registerPage.passwordInput,
            registerPage.dobDaySelect,
            registerPage.termsCheckboxInput
        ];

        for (const f of noErrorFields) await expectNoError(page, f);
  });
});