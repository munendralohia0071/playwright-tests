import { HomePage } from '../../page/HomePage'
import { test, expect } from '../../fixtures/testFixture';
import { ContactPage } from '../../page/ContactPage';
import * as contactData from '../../constants/contactData.json';

test('contact', async ({ page }) => {
  const home = new HomePage(page);
  const contact=new ContactPage(page);
  
  await page.goto('/');
  await home.openContactModal();
  await contact.fillContactDetails(
    contactData.Email,
    contactData.name,
    contactData.Message
  );
const alertMessage =await contact.Sendmessage();
expect(alertMessage).toContain('Thanks for the message!!');
});