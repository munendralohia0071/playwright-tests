import { Page } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';
import { AlertUtils } from '../utils/alertUtils';

export class SignupPage {
  private page: Page;
  private usernameInput = '#sign-username';
  private passwordInput = '#sign-password';
  private signupButton = 'button:has-text("Sign up")';
  private modal = '#signInModal';

  constructor(page: Page) {
    this.page = page;
  }

  async isModalVisible(): Promise<boolean> {
    return this.page.locator(this.modal).isVisible();
  }

  async signup(usernameValue: string, passwordValue: string): Promise<string> {
    const username = this.page.locator(this.usernameInput);
  const password = this.page.locator(this.passwordInput);

  await WaitUtils.waitForReady(username);
  await username.fill(usernameValue);

  await WaitUtils.waitForReady(password);
  await password.fill(passwordValue);

    // Use enhanced AlertUtils to get alert message
    const alertPromise = AlertUtils.acceptAlertWithMessage(this.page);
    await this.page.click(this.signupButton);
    const alertMessage = await alertPromise;

    return alertMessage;
  }
}
