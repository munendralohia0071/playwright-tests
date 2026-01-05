import { Page } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';

export class LoginPage {
  private page: Page;

  private usernameInput = '#loginusername';
  private passwordInput = '#loginpassword';
  private loginButton = 'button:has-text("Log in")';

  constructor(page: Page) {
    this.page = page;
  }

  async login(username: string, password: string) {
    await WaitUtils.waitForReady(this.page.locator(this.usernameInput));
    await this.page.fill(this.usernameInput, username);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  }
}
