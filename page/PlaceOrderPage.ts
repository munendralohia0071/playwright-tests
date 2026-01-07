import { Page ,expect} from '@playwright/test';

export class PlaceOrder {

    constructor(private page:Page) {}
    private placeorder='//button[text()="Place Order"]';
    private modalTitle ='//h5[@id="orderModalLabel" and text()="Place order"]';
    private nameInput="#name";
    private countryInput='//input[@id="country"]';
    private cityInput='//input[@id="city"]';
    private cardInput='//input[@id="card"]';
    private monthInput='//input[@id="month"]';
    private yearInput='//input[@id="year"]';
    private PurchaseButton='//button[text()="Purchase"]';
    private successTitle = '//h2[text()="Thank you for your purchase!"]';
    private successDetails = '//p[contains(@class,"lead") and contains(@class,"text-muted")]';
    private okButton = '//button[text()="OK"]';

     async placeorders(){
        await this.page.reload();
        await this.page.click(this.placeorder);
        await this.page.waitForSelector('#name', { state: 'visible' });
    }

async fillOrderDetails(
  name: string,
  country: string,
  city: string,
  card: string,
  month: string,
  year: string
) {
  await this.page.locator(this.nameInput).fill(name);
  await this.page.locator(this.countryInput).fill(country);
  await this.page.locator(this.cityInput).fill(city);
  await this.page.locator(this.cardInput).fill(card);
  await this.page.locator(this.monthInput).fill(month);
  await this.page.locator(this.yearInput).fill(year);
}
async clickPurchase(){
    await this.page.click(this.PurchaseButton);
}
  async validateSuccessPopup() {
    await expect(this.page.locator(this.successTitle)).toBeVisible();
    await expect(this.page.locator(this.successDetails)).toBeVisible();
  }
async validateSuccessPopupContent(expectedData: any) {
   const text = await this.page.locator(this.successDetails).textContent();
    expect(text).not.toBeNull();

    expect(text).toContain('Id:');
    expect(text).toContain('Amount:');
   expect(text!).toContain(`Name: ${expectedData.name}`);
   expect(text!).toContain(`Card Number: ${expectedData.card}`);
    expect(text).toContain('Date:');
  }

  async clickOk() {
    await this.page.locator(this.okButton).click();
  }
}