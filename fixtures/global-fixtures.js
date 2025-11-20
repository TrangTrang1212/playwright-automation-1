import { test as base } from '@playwright/test';
import fs from 'fs';

export const test = base.extend({
  localeData: async ({}, use, testInfo) => {
    const file = testInfo.config.use.testDataFile;

    if (!file) {
      throw new Error('testDataFile chưa được cấu hình trong project.use');
    }

    const data = JSON.parse(fs.readFileSync(file, 'utf-8'));
    await use(data);
  }
});

export const expect = base.expect;
