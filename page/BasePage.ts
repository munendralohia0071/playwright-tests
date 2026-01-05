// pages/BasePage.ts
import { Page } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';

export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate(url: string) {
    await this.page.goto(url);
    await WaitUtils.waitForPageLoad(this.page);
  }
}
