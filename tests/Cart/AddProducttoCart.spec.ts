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

test("Add Product to Cart",async()=>{

await cartPage.selectephone(productsData.Phones[2]);
     expect(await productName.getTitle()).toBe(productsData.Phones[2]);
    expect(await productName.isPriceVisible()).toBeTruthy();
    expect(await productName.isDescriptionVisible()).toBeTruthy();
    expect(await productName.isAddToCartVisible()).toBeTruthy();

const alertMessage=await cartPage.Addtocard()
expect(alertMessage).toContain('Product added');
await homePage.openCart();
expect (await cartPage.verifyaddtocardproduct()).toBe(productsData.Phones[2]);

});

});