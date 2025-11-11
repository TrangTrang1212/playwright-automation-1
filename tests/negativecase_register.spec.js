import { test } from './fixtures.js'; 
import { expect } from '@playwright/test'; 

test.describe('Register Fail',()=> {
    test('Click "Create account" button with empty required fields', async({page, newUser}) => {
        await page.goto('https://sssg.stg.samsonite-asia.com/register',{ waitUntil: 'domcontentloaded' });

        const createAccountBtn = page.locator('button[data-onetag-type="signup"]');
        await createAccountBtn.click();

        const errorMessage = page.locator('.invalid-feedback');
        await expect(errorMessage.nth(1)).toHaveText('Please select an item in the list'); //title
        await expect(errorMessage.nth(2)).toHaveText('Please fill out this field.'); //FirstName
        await expect(errorMessage.nth(3)).toHaveText('Please fill out this field.'); //LastName
        await expect(errorMessage.nth(4)).toHaveText('Please fill out this field.'); //PhoneNumber
        await expect(errorMessage.nth(5)).toHaveText('The date is invalid'); //DateOfBirth
        await expect(errorMessage.nth(6)).toHaveText('Please fill out this field.'); //Email
        await expect(errorMessage.nth(7)).toHaveText('Please fill out this field.'); //Password
        await expect(errorMessage.nth(8)).toHaveText('Please fill out this field.'); //ConfirmPw
        await expect(errorMessage.nth(9)).toHaveText('Please check this box if you want to proceed.'); //CheckboxAgreeToPrivacyPolicy
    });
    test('Click "Create account" button without title', async({page, newUser}) => {
        await page.goto('https://sssg.stg.samsonite-asia.com/register',{ waitUntil: 'domcontentloaded' });
        await page.fill('#registration-form-fname', newUser.firstName);
        await page.fill('#registration-form-lname', newUser.lastName);
        await page.fill('#registration-form-phone', newUser.phone);
        await page.fill('#registration-form-email', newUser.email);
        await page.fill('#registration-form-password', newUser.password);
        await page.fill('#registration-form-password-confirm', newUser.confirmPw);

        await page.selectOption('#day', newUser.dob.day);
        await page.selectOption('select[name="month"]', newUser.dob.month);
        await page.selectOption('#year', newUser.dob.year);

        const checkbox = page.locator('label[for="accept-terms-condition"]');
        await checkbox.setChecked(true);

        const createAccountBtn = page.locator('button[data-onetag-type="signup"]');
        await createAccountBtn.click();

        const errorMessage = page.locator('.invalid-feedback');
        await expect(errorMessage.nth(1)).toHaveText('Please select an item in the list'); //title
    });
    test('Click "Create account" button without firstname', async({page, newUser}) => {
        await page.goto('https://sssg.stg.samsonite-asia.com/register',{ waitUntil: 'domcontentloaded' });

        await page.selectOption('#registration-form-title', newUser.title);
        await page.fill('#registration-form-lname', newUser.lastName);
        await page.fill('#registration-form-phone', newUser.phone);
        await page.fill('#registration-form-email', newUser.email);
        await page.fill('#registration-form-password', newUser.password);
        await page.fill('#registration-form-password-confirm', newUser.confirmPw);

        await page.selectOption('#day', newUser.dob.day);
        await page.selectOption('select[name="month"]', newUser.dob.month);
        await page.selectOption('#year', newUser.dob.year);

        const checkbox = page.locator('label[for="accept-terms-condition"]');
        await checkbox.setChecked(true);

        const createAccountBtn = page.locator('button[data-onetag-type="signup"]');
        await createAccountBtn.click();

        const errorMessage = page.locator('.invalid-feedback');
        const count = await errorMessage.count();

        if(count > 1){
            throw new Error(`Expected only 1 error for FirstName, but found ${count}`)
        }
        await expect(errorMessage.nth(2)).toHaveText('Please fill out this field.'); //FirstName
    });
});