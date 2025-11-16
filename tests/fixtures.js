import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const counterPath = path.join(__dirname, 'phoneCounter.json');

function readCounter() {
  if (!fs.existsSync(counterPath)) {
    fs.writeFileSync(counterPath, JSON.stringify({ current: 8 }, null, 2));
  }
  const data = JSON.parse(fs.readFileSync(counterPath, 'utf-8'));
  return data.current || 8;
}

function writeCounter(value) {
  fs.writeFileSync(counterPath, JSON.stringify({ current: value }, null, 2));
}

export const test = base.extend({
  newUser: async ({}, use) => {
    let phoneCounter = readCounter();

    phoneCounter++;

    // chỉ lấy 8 chữ số, bắt đầu bằng 9
    const phoneNumber = String(phoneCounter).padStart(7, '0'); // 7 chữ số sau 9
    const phone = '9' + phoneNumber; // tổng 8 chữ số

    writeCounter(phoneCounter);

    const user = {
      title: 'Miss',
      firstName: 'Globee',
      lastName: 'Test',
      email: `globee_test${phoneCounter}@example.com`,
      phone,
      password: '12345678',
      confirmPw: '12345678',
      confirmPw_error: '123456789',
      dob: { day: '15', month: '6', year: '1995' }
    };

    console.log('Generated user phone:', phone); // kiểm tra
    await use(user);
  }
});
