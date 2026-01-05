import { test, expect } from '../../fixtures/testFixture';
import { HomePage } from '../../page/HomePage'
import { SignupPage } from '../../page/SignupPage';
import { LoginPage } from '../../page/signup-loginPage';
import { Helpers } from '../../utils/helpers';

test('Signup with random user and login with same data', async ({ page }) => {
  const home = new HomePage(page);
  const signup = new SignupPage(page);
  const login = new LoginPage(page);

  const user = Helpers.generateRandomUser();

  await page.goto('/');

  // -----------------------------
  // 1️⃣ Open Signup Modal
  // -----------------------------
  await home.openSignUp();
  await expect(page.locator('#signInModal')).toBeVisible({ timeout: 5000 });

  // -----------------------------
  // 2️⃣ Signup with random user
  // -----------------------------
  const alertMessage = await signup.signup(user.username, user.password);
  expect(alertMessage).toContain('Sign up successful');


  // -----------------------------
  // 3️⃣ Attempt duplicate signup (optional)
  // -----------------------------
  await page.reload();
  await home.openSignUp();
  await expect(page.locator('#signInModal')).toBeVisible({ timeout: 5000 });
  
  const duplicateAlert = await signup.signup(user.username, user.password);
  expect(duplicateAlert).toContain('This user already exist.');
  await page.reload();
  // -----------------------------
  // 4️⃣ Login with the same user
  // -----------------------------
  await home.openLogin();
  await login.login(user.username, user.password);

  // -----------------------------
  // 5️⃣ Verify Login Success
  // -----------------------------
  await expect(page.locator('#logout2')).toBeVisible();
});
