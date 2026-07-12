import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright-tests',
  use: {
    headless: true,
    baseURL: 'http://localhost:5174',
    trace: 'on-first-retry',
  },
});
