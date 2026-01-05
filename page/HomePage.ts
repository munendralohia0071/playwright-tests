import { expect, Page, Locator } from '@playwright/test';
import * as productsData from '../constants/products.json';

export class HomePage {
  private page: Page;

  // existing simple selectors
  private signupLink = '#signin2';
  private loginLink = '#login2';
  private logoutLink = '#logout2';
  private welcomeUser = '#nameofuser';

  // category selectors
  private phonesCategory = 'a:has-text("Phones")';
  private laptopsCategory = 'a:has-text("Laptops")';
  private monitorsCategory = 'a:has-text("Monitors")';

  // modal CSS containers
  private contactModal = '#exampleModal .modal-content';
  private contactModalClose = '#exampleModal button:has-text("Close")';

  private aboutModal = '#videoModal .modal-content';
  private aboutModalClose = '//div[@id="videoModal"]//button[@class="btn btn-secondary"]';

  // ===== Product Browsing & Selection =====

// CSS selector for all product titles in the list
private productTitles = '#tbodyid .card-title a';

  constructor(page: Page) {
    this.page = page;
  }

  // ===== Navigation locators as getters =====

  get homeNav(): Locator {
    // Matches the text “Home” in the navbar
    return this.page.locator('text=Home');
  }

  get contactNav(): Locator {
    // Matches the text “Contact” in the navbar
    return this.page.locator('//a[@data-target="#exampleModal"]');
  }

  get aboutNav(): Locator {
    // Matches the text “About us” in the navbar
    return this.page.locator('//a[@data-target="#videoModal"]');//
  }

  get cartNav(): Locator {
    // Matches the Cart link by text
    return this.page.locator('//a[@id="cartur"]');
  }

  // ===== Basic navigation =====

  async gotoHome(): Promise<void> {
    // Navigate to the base URL (configured in Playwright config)
    await this.page.goto('/');
  }

  async verifyTitle(expectedTitle = 'STORE'): Promise<void> {
    // The DemoBlaze homepage title is STORE
    await expect(this.page).toHaveTitle(expectedTitle);
  }

  // ===== Before Login UI =====

  async verifyHomePageBeforeLogin(): Promise<void> {
    await this.verifyTitle();
    await expect(this.page.locator(this.loginLink)).toBeVisible();
    await expect(this.page.locator(this.signupLink)).toBeVisible();
    await expect(this.page.locator(this.logoutLink)).toBeHidden();
    await expect(this.page.locator(this.welcomeUser)).toBeHidden();
  }

  async openSignUp(): Promise<void> {
    // Open signup modal
    await this.page.click(this.signupLink);
  }

  async openLogin(): Promise<void> {
    // Open login modal
    await this.page.click(this.loginLink);
  }

  async isLoggedIn(): Promise<boolean> {
    // Check if logout link is visible
    return this.page.locator(this.logoutLink).isVisible();
  }

  // ===== Categories =====

  async verifyMainCategories(): Promise<void> {
    await expect(this.page.locator(this.phonesCategory)).toBeVisible();
    await expect(this.page.locator(this.laptopsCategory)).toBeVisible();
    await expect(this.page.locator(this.monitorsCategory)).toBeVisible();
  }

  // ===== Contact Modal =====

  async openContactModal(): Promise<void> {
    await this.contactNav.click();
  }

  async verifyContactModalIsVisible(): Promise<void> {
    await expect(this.page.locator(this.contactModal)).toBeVisible();
  }

  async closeContactModal(): Promise<void> {
    await this.page.locator(this.contactModalClose).click();
  }

  // ===== About Us Modal =====

  async openAboutModal(): Promise<void> {
    await this.aboutNav.click();
  }

  async verifyAboutModalIsVisible(): Promise<void> {
    await expect(this.page.locator(this.aboutModal)).toBeVisible();
  }

  async closeAboutModal(): Promise<void> {
    await this.page.locator(this.aboutModalClose).click();
  }

  // ===== Cart Navigation =====

  async openCart(): Promise<void> {
    await this.cartNav.click();
  }

  async clickHomeNav(): Promise<void> {
    await this.homeNav.click();
  }

  // ===== Browser Navigation =====

  async goBack(): Promise<void> {
    await this.page.goBack();
  }
  /**
 * Click a category (Phones, Laptops, Monitors) and wait for products to load
 */

async clickCategory(category: 'Phones' | 'Laptops' | 'Monitors'): Promise<void> {
  const categorySelector = `a:has-text("${category}")`;

  // Get first product before click
  const firstProductLocator = this.page.locator(this.productTitles).first();
  let previousFirst: string | null = null;
  if ((await firstProductLocator.count()) > 0) {
    previousFirst = (await firstProductLocator.textContent())?.trim() || null;
  }

  // Click the category
  await this.page.click(categorySelector);

  // Wait until the first visible product changes
  await this.page.waitForFunction(
    ({ selector, previousFirst }) => {
      const firstEl = document.querySelector(selector);
      const firstText = firstEl?.textContent?.trim();
      return firstText && firstText !== previousFirst;
    },
    { selector: this.productTitles, previousFirst } // pass as object
  );
}

/**
 * Get all product names currently visible on the page
 */
async getAllProducts(category: 'Phones' | 'Laptops' | 'Monitors'): Promise<string[]> {
  const allProducts = this.page.locator(this.productTitles);
  const count = await allProducts.count();
  const products: string[] = [];

  for (let i = 0; i < count; i++) {
    const product = allProducts.nth(i);
    if (await product.isVisible()) {
      const text = (await product.textContent())?.trim();
      if (text && (productsData[category] as string[]).includes(text)) {
        products.push(text);
      }
    }
  }

  return products;
}

/**
 * Open the first product from the current product list
 * @returns the product name for validation
 */
async openFirstProduct(): Promise<string> {
  const firstProduct = this.page.locator(this.productTitles).first();
  const name = (await firstProduct.textContent())?.trim();
  await firstProduct.click();
  return name!;
}


}
