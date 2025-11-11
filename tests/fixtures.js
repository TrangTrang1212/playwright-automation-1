import {test as base} from '@playwright/test';
import { faker } from '@faker-js/faker';


export const test = base.extend({
  newUser: async ({}, use) => {
    const randomEightDigits = faker.number.int({ min: 10000000, max: 99999999 });
    const user = {
      title: 'Miss',
      firstName: 'Globee',
      lastName: 'Test',
      email: faker.internet.email('globee_test'),
      phone: '0900' + randomEightDigits,
      password: '12345678',
      confirmPw: '12345678',
      dob: {
        day: '15',   
        month: '6',
        year: '1995'
      }
    };
    await use(user);
  }
});