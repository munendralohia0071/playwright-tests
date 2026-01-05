import { test, expect } from '@playwright/test';
import { HomePage } from '../../page/HomePage';
import { ProductPage } from '../../page/ProductPage';
import { CartPage } from '../../page/CartPage';
import * as productsData from '../../constants/products.json';

test.describe("Cart & Cart Management",()=>{

    let homePage:HomePage;
    let cartPage:CartPage;
    let productName:ProductPage;

test.beforeEach(async({page})=>{
homePage =new HomePage(page);
cartPage=new CartPage(page);
productName=new ProductPage(page);
await homePage.gotoHome(); 
});

test("Add Multiple Products to Cart",async()=>{
for(let i=0;i<2;i++){

await cartPage.selectephone(productsData.Phones[i]);
expect(await productName.getTitle()).toBe(productsData.Phones[i]);
const alertMessage=await cartPage.Addtocard()
expect(alertMessage).toContain('Product added');
await homePage.gotoHome();

await cartPage.selecteLaptops(productsData.Laptops[i]);
expect(await productName.getTitle()).toBe(productsData.Laptops[i]);
const alertMessage1=await cartPage.Addtocard()
expect(alertMessage1).toContain('Product added');
await homePage.gotoHome();

await cartPage.selectemoniter(productsData.Monitors[i]);
expect(await productName.getTitle()).toBe(productsData.Monitors[i]);
const alertMessage2=await cartPage.Addtocard()
expect(alertMessage2).toContain('Product added');
await homePage.gotoHome();
}
await homePage.openCart();
//before product deleted
const cartItems =await cartPage.getCartProductsWithPrices();
console.log(cartItems );
const expectedItems = [
  { name: productsData.Phones[0], price: 360 },
  { name: productsData.Laptops[0], price: 790 },
  { name: productsData.Monitors[0], price: 400 },
  { name: productsData.Phones[1], price: 820 },
  { name: productsData.Laptops[1], price: 700 },
  { name: productsData.Monitors[1], price: 230 },
];

expect(cartItems).toEqual(expect.arrayContaining(expectedItems));
// Sum all prices from cart rows
const calculatedTotal = cartItems.reduce(
  (sum, item) => sum + item.price,
  0
);

// Get UI total
const displayedTotal = await cartPage.getDisplayedTotal();

console.log('Calculated Total:', calculatedTotal);
console.log('Displayed Total:', displayedTotal);

// ✅ ASSERTION Calculated Total and 'Displayed Total
expect(displayedTotal).toBe(calculatedTotal);

    //after product deleted

// Delete phone
await cartPage.deleteProductByName(productsData.Phones[0]);
await cartPage.deleteProductByName(productsData.Laptops[0]);

// Get updated cart
const cartItems1 = await cartPage.getCartProductsWithPrices();
const cartNames1 = cartItems1.map(item => item.name);

// ❌ Deleted product should be gone
expect(cartNames1).not.toContain(productsData.Phones[0]);
expect(cartNames1).not.toContain(productsData.Laptops[0]);

// ✅ Remaining products still exist
expect(cartItems1).toEqual(
  expect.arrayContaining([
  { name: productsData.Monitors[0], price: 400 },
  { name: productsData.Phones[1], price: 820 },
  { name: productsData.Laptops[1], price: 700 },
  { name: productsData.Monitors[1], price: 230 },
  ])
);

// ✅ Total price validation
const calculatedTotal1 = cartItems1.reduce((sum, item) => sum + item.price, 0);
const displayedTotal1 = await cartPage.getDisplayedTotal();
expect(displayedTotal1).toBe(calculatedTotal1);
console.log('Calculated Total:', calculatedTotal1);
console.log('Displayed Total:', displayedTotal1);

});
});