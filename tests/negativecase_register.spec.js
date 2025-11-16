import { test } from './fixtures.js'; 
import { 
  fillAllFields, 
  expectFieldError, 
  expectNoError 
} from '../helpers/register.js';

const URL = 'https://sssg.stg.samsonite-asia.com/register';

test.describe('Register Fail',()=> {

    test.beforeEach(async ({ page }) => {
    await page.goto(URL, { waitUntil: 'domcontentloaded' });
    });

    test('Click "Create account" button with empty required fields', async({page}) => {
        
        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#registration-form-title', 'Please select an item in the list');
        await expectFieldError(page, '#registration-form-fname', 'Please fill out this field.');
        await expectFieldError(page, '#registration-form-lname', 'Please fill out this field.');
        await expectFieldError(page, '#registration-form-phone', 'Please fill out this field.');
        await expectFieldError(page, '#dob-combining', 'The date is invalid');
        await expectFieldError(page, '#registration-form-email', 'Please fill out this field.');
        await expectFieldError(page, '#registration-form-password', 'Please fill out this field.');
        await expectFieldError(page, '#registration-form-password-confirm', 'Please fill out this field.');
        await expectFieldError(page, '#accept-terms-condition', 'Please check this box if you want to proceed.');
        
    });

    test('Click "Create account" button without title', async({page, newUser}) => {
        
        await fillAllFields(page, newUser)
        await page.selectOption('#registration-form-title', '');

        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#registration-form-title', 'Please select an item in the list');

        // Các field khác không có lỗi
        const fields = [
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];
        for (const f of fields) await expectNoError(page, f);
    });

    test('Click "Create account" button without firstname', async ({ page, newUser }) => {
   
        await fillAllFields (page, newUser)
        await page.fill('#registration-form-fname', '');
    
        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page,'#registration-form-fname', 'Please fill out this field.');

        // Các field khác không có lỗi
        const fields = [
            '#registration-form-title',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);
    });

    test('Click "Create account" button without Lastname', async ({ page, newUser }) => {

        await fillAllFields(page, newUser);
        await page.fill('#registration-form-lname', '');
        
        await page.locator('button[data-onetag-type="signup"]').click();
        await expectFieldError(page, '#registration-form-lname', 'Please fill out this field.');

        // Các field khác không có lỗi
        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);

    });

    test('Click "Create account" button without Phone Number', async ({ page, newUser }) => {
   
        await fillAllFields(page, newUser);
        await page.fill('#registration-form-phone', '');
        
        await page.locator('button[data-onetag-type="signup"]').click();
        await expectFieldError(page, '#registration-form-phone', 'Please fill out this field.');

        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-email',
            '#registration-form-password',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);
    });

    test('Click "Create account" button without date of birth', async ({ page, newUser }) => {
        await fillAllFields(page, newUser);

        // xoá DOB
        await page.selectOption('#day', '');
        await page.selectOption('select[name="month"]', '');
        await page.selectOption('#year', '');

        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#dob-combining', 'The date is invalid');

        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password',
            '#registration-form-password-confirm',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);
    });

    test('Click "Create account" button without email', async ({ page, newUser }) => {
        await fillAllFields(page, newUser);
        await page.fill('#registration-form-email', '');

        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#registration-form-email', 'Please fill out this field.');

        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-password',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);   
    });

    test('Click "Create account" button without password', async ({ page, newUser }) => {
        await fillAllFields(page, newUser);
        await page.fill('#registration-form-password', '');

        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#registration-form-password', 'Please fill out this field.');

        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password-confirm',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);
    });

    test('Click "Create account" button with invalid password', async ({ page, newUser }) => {
        await fillAllFields(page, newUser);
        await page.fill('#registration-form-password-confirm', newUser.confirmPw_error);

        await page.locator('button[data-onetag-type="signup"]').click();

        await expectFieldError(page, '#registration-form-password-confirm', 'Does not match the password');

        const fields = [
            '#registration-form-title',
            '#registration-form-fname',
            '#registration-form-lname',
            '#registration-form-phone',
            '#registration-form-email',
            '#registration-form-password',
            '#dob-combining',
            'label[for="accept-terms-condition"]'
        ];

        for (const f of fields) await expectNoError(page, f);
  });
});