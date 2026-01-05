import {expect, Page} from "@playwright/test"
import * as productsData from '../constants/products.json';
import { AlertUtils } from '../utils/alertUtils';

export class CartPage {

    constructor(private page:Page) {}
    private phone='//a[text()="Phones"]'
    private Laptops='//a[text()="Laptops"]'
    private moniter='//a[text()="Monitors"]'
    private addToCartBtn = '.btn-success';
    private nameofproduct='//td[2]';
   
    private selectProductphone(productName: string): string {
    return `//a[text()='${productName}']`;
  }
 private selectProductLaptop(productName: string): string {
    return `//a[text()='${productName}']`;
    
  }
  private selectProductmoniter(productName: string): string {
    return `//a[text()='${productName}']`;
  }

    async selectephone(phoneName: string){
        await this.page.click(this.phone);
        await this.page.click(this.selectProductphone(phoneName));
        
    }
      async selecteLaptops(laptop: string){
        await this.page.click(this.Laptops);
        await this.page.click(this.selectProductLaptop(laptop));
    }
     async selectemoniter(moniter:string){
        await this.page.click(this.moniter);
        await this.page.click(this.selectProductmoniter(moniter));
    }
    async Addtocard(){
        const alertPromise = AlertUtils.acceptAlertWithMessage(this.page);
            await this.page.click(this.addToCartBtn);
            const alertMessage = await alertPromise;
            return alertMessage;
    }
async verifyaddtocardproduct()
{
    const productname=await this.page.locator(this.nameofproduct).textContent();
    return productname;

}
async getCartProductsWithPrices(): Promise<
  { name: string; price: number }[]
> {
  // wait until at least one cart row exists
  await this.page.waitForSelector('#tbodyid tr');

  const rows = this.page.locator('#tbodyid tr');
  const rowCount = await rows.count();

  const products: { name: string; price: number }[] = [];

  for (let i = 0; i < rowCount; i++) {
    const row = rows.nth(i);

    const name = (await row.locator('td:nth-child(2)').textContent())?.trim();
    const priceText = (await row.locator('td:nth-child(3)').textContent())?.trim();

    products.push({
      name: name ?? '',
      price: Number(priceText),
    });
  }

  return products;
  
}
async getDisplayedTotal(): Promise<number> {
  await this.page.waitForSelector('#totalp');
  const totalText = await this.page.locator('#totalp').textContent();
  return Number(totalText?.trim());
}

 async deleteProductByName(productName: string) {
  const row = this.page
    .locator('#tbodyid tr')
    .filter({ hasText: productName });

  const rowCountBefore = await this.page.locator('#tbodyid tr').count();

  await row.locator('a:text("Delete")').click();

  // wait until row is removed
  await expect(this.page.locator('#tbodyid tr')).toHaveCount(rowCountBefore - 1);
}


    
    

}