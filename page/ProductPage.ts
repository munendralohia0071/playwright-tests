import { Page } from '@playwright/test';

export class ProductPage {
  constructor(private page: Page) {}

  private title = '.name';
  private price = '.price-container';
  private description = '#more-information';
  private addToCartBtn = '.btn-success';

  async getTitle(): Promise<string> {
    return (await this.page.locator(this.title).textContent())!.trim();
  }

  async isPriceVisible(): Promise<boolean> {
    return this.page.locator(this.price).isVisible();
  }

  async isDescriptionVisible(): Promise<boolean> {
    return this.page.locator(this.description).isVisible();
  }

  async isAddToCartVisible(): Promise<boolean> {
    return this.page.locator(this.addToCartBtn).isVisible();
  }
}
