import { test, expect } from '@playwright/test'

test.describe('Incidents page', () => {
  test.beforeEach(async ({ page }) => {
    // Inject a mock token so ProtectedRoute passes
    await page.goto('/login')
    await page.evaluate(() => localStorage.setItem('sentri_token', 'mock-token'))
    await page.goto('/incidents')
  })

  test('shows incident list', async ({ page }) => {
    await expect(page.getByText('Incidents')).toBeVisible()
    await expect(page.getByText('Notification Bus latency spike')).toBeVisible()
  })

  test('search filters incidents', async ({ page }) => {
    await page.getByPlaceholder('Search incidents…').fill('API Gateway')
    await expect(page.getByText('Notification Bus latency spike')).not.toBeVisible()
    await expect(page.getByText('API Gateway 503s in eu-west')).toBeVisible()
  })

  test('severity filter narrows list', async ({ page }) => {
    await page.getByRole('button', { name: 'critical' }).click()
    const items = page.locator('[class*=border-l-red]')
    await expect(items).not.toHaveCount(0)
  })
})
