import { Locator } from '@playwright/test';

export class WaitUtils {
  static async waitForReady(
    locator: Locator,
    timeout = 5000
  ): Promise<void> {
    // Wait until element is attached
    await locator.waitFor({ state: 'attached', timeout });

    // Wait until it can be interacted with
    await locator.waitFor({ state: 'visible', timeout });
  }
}
