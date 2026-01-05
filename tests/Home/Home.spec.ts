import { test } from '../../fixtures/testFixture';
import { HomePage } from '../../page/HomePage';
import { expect } from '@playwright/test';

test('Home & Navigation - Open Homepage and validate UI + Navigation', async ({
  page,
}) => {
  const home = new HomePage(page);
    await home.gotoHome();
 // ✅ Title + UI verification
    await home.verifyHomePageBeforeLogin();
  // Step 1: Open homepage


  // Step 1b: Verify categories
  await home.verifyMainCategories();

  // Step 2: Contact modal
  await home.openContactModal();
  await home.verifyContactModalIsVisible();

  // Close Contact modal
  await home.closeContactModal();

  // Step 3: About Us modal
  await home.openAboutModal();
  await home.verifyAboutModalIsVisible();

  // Close About Us modal
  await home.closeAboutModal();

  // Step 4: Navigate to Cart
  await home.openCart();
  await expect(page).toHaveURL(/cart.html/);

  // Back to homepage
  await home.goBack();
  await expect(page).toHaveURL(/demoblaze\.com\/?$/);
});
