import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173/';

test('should allow signing in', async ({ page }) => {
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
  await expect(page.getByRole('link', {name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole('link', {name: "My Venues" })).toBeVisible();
  await expect(page.getByRole('button', {name: "Sign Out" })).toBeVisible();
});

test("should allow register", async ({ page }) => {

  const testEmail = `test-${Math.floor(Math.random() * 90001) + 1000}@test.com`;
  const testMobile = `test-${Math.floor(Math.random() * 90001) + 1000}`;
  await page.goto(UI_URL);

  // Click the register link.
  await page.getByRole('link', { name: 'sign-in' }).click();
  await page.getByRole('link', { name: 'Create an account here' }).click();
  await expect(page.getByRole('heading', { name: 'Create an account' })).toBeVisible();

  // Fill the register form.
  await page.locator('[name="firstName"]').fill("firstName");
  await page.locator('[name="lastName"]').fill("lastName");
  await page.locator('[name="email"]').fill(testEmail);
  await page.locator('[name="mobile"]').fill(testMobile);
  await page.locator('[name="password"]').fill("password");
  await page.locator('[name="confirmPassword"]').fill("password");

  // Submit the form.
  await page.getByRole('button', { name: 'Create Account' }).click();

  // check if Toast message is displayed. User is redirected to the home page.
  await expect(page.getByText('Registeration Success!')).toBeVisible();
  await expect(page.getByRole('link', {name: "My Bookings" })).toBeVisible();
  await expect(page.getByRole('link', {name: "My Venues" })).toBeVisible();
  await expect(page.getByRole('button', {name: "Sign Out" })).toBeVisible();

});