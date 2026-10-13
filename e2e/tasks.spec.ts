import { test, expect } from '@playwright/test';

test('alur utama task tracker', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));

  await page.goto('/');
  const items = page.getByTestId('task-item');
  await expect(items).toHaveCount(5);
  await expect(page.getByTestId('summary-total')).toHaveText('5');

  await page.getByTestId('task-title-input').fill('Tugas E2E');
  await page.getByTestId('task-submit').click();
  await expect(items).toHaveCount(6);
  await expect(page.getByTestId('summary-total')).toHaveText('6');
  await expect(page.getByTestId('summary-todo')).toHaveText('3');

  await items.first().getByTestId('status-select').selectOption('Done');
  await expect(page.getByTestId('summary-todo')).toHaveText('2');
  await expect(page.getByTestId('summary-done')).toHaveText('2');

  await items.first().getByTestId('edit-button').click();
  await items.first().getByTestId('task-title-input').fill('Tugas E2E diubah');
  await items.first().getByTestId('task-submit').click();
  await expect(items.first().getByTestId('task-title')).toHaveText('Tugas E2E diubah');

  await page.getByTestId('search-input').fill('E2E');
  await expect(items).toHaveCount(1);
  await page.getByTestId('search-input').fill('');
  await page.getByTestId('filter-status').selectOption('Done');
  await expect(items).toHaveCount(2);
  await page.getByTestId('filter-status').selectOption('All');

  await page.reload();
  await expect(items).toHaveCount(6);
  await expect(items.first().getByTestId('task-title')).toHaveText('Tugas E2E diubah');
  const saved = await page.evaluate(() => JSON.parse(localStorage.getItem('task-tracker.tasks.v1')!));
  expect(saved).toHaveLength(6);

  await items.first().getByTestId('delete-button').click();
  await expect(items).toHaveCount(5);
  await expect(page.getByTestId('summary-total')).toHaveText('5');

  await page.setViewportSize({ width: 375, height: 700 });
  await expect(page.getByTestId('summary-total')).toBeVisible();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  expect(overflow).toBe(false);

  expect(errors).toEqual([]);
});
