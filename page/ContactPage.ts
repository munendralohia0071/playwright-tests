import { Page,expect } from "@playwright/test";
import { AlertUtils } from '../utils/alertUtils';

export class ContactPage {
constructor(private page:Page) {}
private ContactEmailInput='//input[@id="recipient-email"]';
private ContactNameInput='//input[@id="recipient-name"]';
private MessageInput='//textarea[@id="message-text"]';
private Sendmessagebutton='//button[text()="Send message"]';

async fillContactDetails(
  Email: string,
  name: string,
  message: string,
 
) {
  await this.page.locator(this.ContactEmailInput).fill(Email);
  await this.page.locator(this.ContactNameInput).fill(name);
  await this.page.locator(this.MessageInput).fill(message);
}
async Sendmessage() {
     const alertPromise = AlertUtils.acceptAlertWithMessage(this.page);
        await this.page.locator(this.Sendmessagebutton).click();
        const alertMessage = await alertPromise;
        return alertMessage;
    
  }
}