# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: e2e.spec.ts >> create event, participant, inscribe and verify inscritos
- Location: playwright-tests\e2e.spec.ts:4:1

# Error details

```
Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
Call log:
  - navigating to "http://localhost:5174/", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | // End-to-end test: create event, create participant, inscribe, and verify inscritos
  4  | test('create event, participant, inscribe and verify inscritos', async ({ page }) => {
  5  |   // assume frontend dev server is running at baseURL from playwright config
> 6  |   await page.goto('/');
     |              ^ Error: page.goto: net::ERR_CONNECTION_REFUSED at http://localhost:5174/
  7  | 
  8  |   // Create new event via the "Nuevo" button and form in the aside
  9  |   await page.click('button:has-text("Nuevo")');
  10 |   await page.fill('[data-testid="titulo-input"]', 'Evento E2E');
  11 |   await page.fill('[data-testid="tipo-input"]', 'Conferencia');
  12 |   // set a fecha (today)
  13 |   const today = new Date();
  14 |   const yyyy = today.getFullYear();
  15 |   const mm = String(today.getMonth() + 1).padStart(2, '0');
  16 |   const dd = String(today.getDate()).padStart(2, '0');
  17 |   const date = `${yyyy}-${mm}-${dd}`;
  18 |   await page.fill('[data-testid="fecha-input"]', date);
  19 |   await page.click('[data-testid="guardar-evento"]');
  20 | 
  21 |   // Wait for the event to appear in the list
  22 |   await page.waitForSelector('div[data-event-id]');
  23 |   const eventItem = page.locator('div[data-event-id]').filter({ hasText: 'Evento E2E' }).first();
  24 |   await expect(eventItem).toBeVisible();
  25 | 
  26 |   // Create a participant: switch to Participantes
  27 |   await page.click('button:has-text("Participantes")');
  28 |   await page.fill('[data-testid="nombre-input"]', 'Juan E2E');
  29 |   await page.fill('[data-testid="email-input"]', 'juan@example.com');
  30 |   await page.click('[data-testid="crear-participante"]');
  31 | 
  32 |   // Wait for participant to show in list
  33 |   await page.waitForSelector('[data-testid="participant-list"]');
  34 |   await expect(page.locator('[data-testid="participant-list"]').locator('text=Juan E2E')).toBeVisible();
  35 | 
  36 |   // Inscribir participante: select event and participant then submit
  37 |   await page.selectOption('[data-testid="evento-select"]', { label: 'Evento E2E' });
  38 |   await page.selectOption('[data-testid="participante-select"]', { label: 'Juan E2E (juan@example.com)' });
  39 |   await page.click('[data-testid="inscribir-btn"]');
  40 | 
  41 |   // Go back to Eventos view and click Ver inscritos for our event
  42 |   await page.click('button:has-text("Eventos")');
  43 |   // wait for list and find the specific 'Ver inscritos' button for the event
  44 |   const inscritosBtn = page.locator('[data-testid^="inscritos-"]').filter({ hasText: 'Ver inscritos' }).first();
  45 |   await inscritosBtn.click();
  46 | 
  47 |   // Verify Juan E2E appears in the Inscritos aside
  48 |   await expect(page.locator('text=Juan E2E')).toBeVisible();
  49 | });
  50 | 
```