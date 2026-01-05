import { test, expect } from '@playwright/test';
import { HomePage } from '../../page/HomePage';
import { ProductPage } from '../../page/ProductPage';
import * as productsData from '../../constants/products.json';

test.describe('Product Browsing & Selection', () => {
  let homePage: HomePage;
  let productPage: ProductPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    productPage = new ProductPage(page);
    await homePage.gotoHome();
  });

  test('Category Navigation', async () => {
  const categories: ('Phones' | 'Laptops' | 'Monitors')[] = ['Phones', 'Laptops', 'Monitors'];

  for (const category of categories) {
  await homePage.clickCategory(category);

  // Only get products that match the category in JSON
  const products = await homePage.getAllProducts(category);
// Print them before sorting
  console.log(`Products in ${category}:`, products);

  const expectedProducts = (productsData[category] as string[]).map(p => p.trim()).sort();
  expect(products.sort()).toEqual(expectedProducts);
}
});
  test('Open Product Detail', async () => {
    await homePage.clickCategory('Phones');
    const productName = await homePage.openFirstProduct();

    expect(await productPage.getTitle()).toBe(productName);
    expect(await productPage.isPriceVisible()).toBeTruthy();
    expect(await productPage.isDescriptionVisible()).toBeTruthy();
    expect(await productPage.isAddToCartVisible()).toBeTruthy();
  });
});
