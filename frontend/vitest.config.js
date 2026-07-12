import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.test.{js,jsx,ts,tsx}'],
    exclude: ['**/playwright-tests/**', '**/*.spec.{ts,tsx,js,jsx}'],
    environment: 'jsdom',
  },
})
