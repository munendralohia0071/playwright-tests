import { Page } from '@playwright/test';
import path from 'path';

export class ScreenshotUtils {
  static async takeScreenshot(page: Page, fileName: string) {
    const filePath = path.join('reports/screenshots', `${fileName}.png`);
    await page.screenshot({ path: filePath, fullPage: true });
  }
}