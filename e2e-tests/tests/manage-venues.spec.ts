import { test, expect } from '@playwright/test';
import path from 'path';

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

test('should allow adding venue', async ({ page }) => {

    await page.goto(`${UI_URL}add-venue`);
    await page.locator('[name="name"]').fill("Test Venue");
    await page.locator('[name="city"]').fill("Test city");
    await page.locator('[name="country"]').fill("Test country");
    await page.locator('[name="address"]').fill("Test Venue Address");
    await page.locator('[name="description"]').fill("This is description to this specifig test Venue, this is a test venue");

    await page.locator('[name="pricePerHour"]').fill("50");
    await page.selectOption('select[name="starRating"]', "4");

    await page.getByText("Golf Course").click();
    await page.getByText("Swimming Pool").click();
    await page.getByLabel("Bathroom").check();
    await page.getByLabel("Cafeteria").check();

    await page.locator('[name="capacity"]').fill("100");

    await page.setInputFiles('[name="imageFiles"]', [
        path.join(__dirname, 'files', '1.jpg'),
        path.join(__dirname, 'files', '2.png'),
    ])

    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Venue added successfully')).toBeVisible();
});

test('should allow viewing venues', async ({ page }) => {
    await page.goto(`${UI_URL}my-venues`);
    await expect(page.getByText('e2eVenue')).toBeVisible();
    await expect(page.getByText('e2eDescription')).toBeVisible();
    await expect(page.getByText('e2eCity')).toBeVisible();
    await expect(page.getByText('e2eCountry')).toBeVisible();
    await expect(page.getByText('Golf Course')).toBeVisible();
    await expect(page.getByText('69 €/hour')).toBeVisible();
    await expect(page.getByText('69 - capacity')).toBeVisible();
    await expect(page.getByText('3 / 5')).toBeVisible();

    await expect(page.getByRole('link', { name: 'View' }).first()
        ).toBeVisible();
    await expect(page.getByRole('link', { name: 'Add Venue' })).toBeVisible();

});

test('should allow editing venue', async ({ page }) => {
    await page.goto(`${UI_URL}my-venues`);
    await page.getByRole('link', { name: "View" }).first().click();

    await page.waitForSelector('[name="name"]', {state: 'attached'});
    await expect(page.locator('[name="name"]')).toHaveValue('e2eVenue');
    await page.locator('[name="name"]').fill('e2eVenue Updated');
    await page.getByRole('button', { name: 'Save' }).click();
    await expect(page.getByText('Venue Saved!')).toBeVisible();

    await page.reload();
    await expect(page.locator('[name="name"]')).toHaveValue('e2eVenue Updated');
    await page.locator('[name="name"]').fill('e2eVenue');
    await page.getByRole('button', { name: 'Save' }).click();
});