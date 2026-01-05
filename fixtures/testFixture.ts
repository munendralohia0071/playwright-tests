// fixtures/testFixture.ts
import { test as baseTest } from '@playwright/test';
import { ScreenshotUtils } from '../utils/screenshotUtils';

export const test = baseTest.extend({
  page: async ({ page }, use, testInfo) => {
    await use(page);

    if (testInfo.status !== testInfo.expectedStatus) {
      await ScreenshotUtils.takeScreenshot(
        page,
        `FAIL_${testInfo.title.replace(/\s+/g, '_')}`
      );
    }
  },
});

export { expect } from '@playwright/test';
