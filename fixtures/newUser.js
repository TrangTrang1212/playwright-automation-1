// fixtures/newUser.js
import { test as base } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { LOCALE } from '../config/locale.config.js';

// Hàm sinh phone theo country
const phoneFormat = {
  SG: () => '8' + Math.floor(Math.random() * 1e7).toString().padStart(8, '0'),

};

export const test = base.extend({
  localeData: async ({}, use, testInfo) => {
    // Lấy locale từ tên project: sg, jp, th_th...
    const localeKey = testInfo.project.name.toLowerCase();
    const file = LOCALE[localeKey]?.data;
    if (!file) throw new Error(`Không tìm thấy JSON data cho locale: ${localeKey}`);
    const data = JSON.parse(fs.readFileSync(path.resolve(file), 'utf-8'));
    await use(data);
  },

  newUser: async ({ localeData }, use, testInfo) => {
    const country = testInfo.project.name.split('_')[0].toUpperCase(); // vd: 'SG'
    const phone = (phoneFormat[country] ? phoneFormat[country]() : '90000000');
    const timestamp = Date.now();
    const email = `globee_${timestamp}@example.com`;

    const user = {
      ...localeData,
      email,
      phone,
      confirmPassword: localeData.password
    };

    await use(user);
  }
});

export const expect = base.expect;
