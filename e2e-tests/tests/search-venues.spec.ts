import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test.beforeEach(async({ page }) => {
    await page.goto(UI_URL);

    // Click the sign in link.
    await page.getByRole('link', { name: 'sign-in' }).click();
    await expect(page.getByRole('heading', { name: 'sign-in' })).toBeVisible();

    // Fill the sign in form.
    await page.locator('[name="email"]').fill("e2e@email.com");
    await page.locator('[name="password"]').fill("password");
  
    // Submit the form.
    await page.getByRole('button', { name: 'Sign In' }).click();
  
    // check if Toast message is displayed. User is redirected to the home page.
    await expect(page.getByText('Sign In Success!')).toBeVisible();
});

test("should show search results", async ({ page }) => {
    await page.goto(UI_URL);

    await page.getByPlaceholder("Where to?").fill("e2eCity");

    await page.getByRole('button', { name: 'Search' }).click();

    await expect(page.locator('text=Venues found in e2eCity')).toBeVisible();
    await expect(page.locator('text=e2eVenue')).toBeVisible();
    await expect(page.locator('text=69')).toBeVisible();
});