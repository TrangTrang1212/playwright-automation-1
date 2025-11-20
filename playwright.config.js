import { defineConfig } from '@playwright/test';
import path from 'path';
import { ENV } from './config/env.config.js';
import { LOCALE } from './config/locale.config.js';

function getBaseURL(country) {
  const selectedEnv = process.env.ENV || 'stg';
  return ENV[selectedEnv][country];
}

export default defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect: { timeout: 5000 },
  use: {
    headless: false,
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'on',
    trace: 'on-first-retry',

  // Thêm credentials
    httpCredentials: {
    username: process.env.BASIC_AUTH_USER || 'storefront',
    password: process.env.BASIC_AUTH_PASSWORD || 'storefront2022',
  }
},
projects: [
    {
      name: 'sg',
      use: {
        baseURL: getBaseURL('SG'),
        locale: LOCALE.sg.language,
        testDataFile: path.resolve(LOCALE.sg.data)
      }
    }
  ]
});
