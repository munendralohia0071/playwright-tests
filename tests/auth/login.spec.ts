import { test, expect } from '../../fixtures/testFixture';
import { HomePage } from '../../page/HomePage'
import { LoginPage } from '../../page/LoginPage';
import { Helpers } from '../../utils/helpers';
import { TestData } from '../../utils/testData';
import {logoutpage} from '../../page/LogOutPage';

test('Login with all combination',async({page})=>{
    const Home=new HomePage(page);
    const login=new LoginPage(page);
    const helpe=new Helpers();
    const logout=new logoutpage(page);

    await page.goto('/');

    await Home.openLogin();
     await login.isLoginPresent();

     // 2️⃣ Login with diffrent -diffrent invaliduser data
  // -----------------------------
  for(let data of TestData.invalidLoginCases){
  const alertMessage = await login.logininValidUser(data.username,data.password);
  expect(alertMessage).toContain(data.expectedMessage);
  await page.reload();
  await Home.openLogin();
  
  }
  // 2️⃣ Login with validuser data
  await login.loginValidUser(TestData.validUser.username, TestData.validUser.password);

  // -----------------------------
  // 5️⃣ Verify Login Success
  // -----------------------------
  
  await expect(page.locator('#logout2')).toBeVisible();
  await logout.Logout();
})