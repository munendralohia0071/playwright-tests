import { test, expect } from '../../fixtures/testFixture';
import { HomePage } from '../../page/HomePage'
import { LoginPage } from '../../page/LoginPage';
import { TestData } from '../../utils/testData';
import { CartPage } from '../../page/CartPage';
import * as productsData from '../../constants/products.json';
import { ProductPage } from '../../page/ProductPage';
import {PlaceOrder} from '../../page/PlaceOrderPage';
import * as OrderData from '../../constants/orderData.json';
import { logoutpage } from '../../page/LogOutPage';


test('E2E Order Place',async({page})=>{

        const Home=new HomePage(page);
        const login=new LoginPage(page);
        const cartPage=new CartPage(page);
        const productName=new ProductPage(page);
        const placeorder=new PlaceOrder(page);
        const logout=new logoutpage(page);

        await page.goto('/');
        await Home.openLogin();
        await login.loginValidUser(TestData.validUser.username, TestData.validUser.password);

        await cartPage.selectephone(productsData.Phones[2]);
       expect(await productName.getTitle()).toBe(productsData.Phones[2]);
       const alertMessage=await cartPage.Addtocard()
       expect(alertMessage).toContain('Product added');
       await Home.gotoHome();
       await cartPage.selecteLaptops(productsData.Laptops[1]);
       expect(await productName.getTitle()).toBe(productsData.Laptops[1]);
       const alertMessage2=await cartPage.Addtocard()
       expect(alertMessage2).toContain('Product added');

       await Home.openCart();

       await placeorder.placeorders();

         await placeorder.fillOrderDetails(
    OrderData.name,
    OrderData.country,
    OrderData.city,
    OrderData.card,
    OrderData.month,
    OrderData.year
  );

  await placeorder.clickPurchase();
  // ✅ Validate popup using JSON
  await placeorder.validateSuccessPopup();

  await placeorder.validateSuccessPopupContent(OrderData);

  await placeorder.clickOk();
  await Home.gotoHome();

  await logout.Logout();

})