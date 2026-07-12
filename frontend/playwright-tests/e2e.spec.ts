import { test, expect } from '@playwright/test';

test('create event, participant, inscribe and verify inscritos', async ({ page }) => {
  await page.goto('/');

  await page.click('button:has-text("Nuevo")');
  await page.fill('[data-testid="titulo-input"]', 'Evento E2E');
  await page.fill('[data-testid="tipo-input"]', 'Conferencia');
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const dd = String(today.getDate()).padStart(2, '0');
  const date = `${yyyy}-${mm}-${dd}`;
  await page.fill('[data-testid="fecha-input"]', date);
  await page.click('[data-testid="guardar-evento"]');

  await page.waitForSelector('div[data-event-id]');
  const eventItem = page.locator('div[data-event-id]').filter({ hasText: 'Evento E2E' }).first();
  await expect(eventItem).toBeVisible();

  await page.click('button:has-text("Participantes")');
  await page.fill('[data-testid="nombre-input"]', 'Juan E2E');
  await page.fill('[data-testid="email-input"]', 'juan@example.com');
  await page.click('[data-testid="crear-participante"]');

  await page.waitForSelector('[data-testid="participant-list"]');
  await expect(page.locator('[data-testid="participant-list"]').locator('text=Juan E2E')).toBeVisible();

  await page.selectOption('[data-testid="evento-select"]', { label: 'Evento E2E' });
  await page.selectOption('[data-testid="participante-select"]', { label: 'Juan E2E (juan@example.com)' });
  await page.click('[data-testid="inscribir-btn"]');

  await page.click('button:has-text("Eventos")');
  const inscritosBtn = page.locator('[data-testid^="inscritos-"]').filter({ hasText: 'Ver inscritos' }).first();
  await inscritosBtn.click();

  await expect(page.locator('text=Juan E2E')).toBeVisible();
});
