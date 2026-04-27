import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('redirects unauthenticated users to /login', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveURL('/login')
  })

  test('login page renders form', async ({ page }) => {
    await page.goto('/login')
    await expect(page.getByPlaceholder('you@example.com')).toBeVisible()
    await expect(page.getByPlaceholder('••••••••')).toBeVisible()
    await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible()
  })

  test('shows validation errors on empty submit', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('button', { name: /sign in/i }).click()
    await expect(page.getByText(/valid email/i)).toBeVisible()
  })

  test('register link navigates to /register', async ({ page }) => {
    await page.goto('/login')
    await page.getByRole('link', { name: /create one/i }).click()
    await expect(page).toHaveURL('/register')
  })
})
