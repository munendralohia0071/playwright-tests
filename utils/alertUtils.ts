// utils/alertUtils.ts
import { Page } from '@playwright/test';

export class AlertUtils {
  static async acceptAlertWithMessage(page: Page): Promise<string> {
    return new Promise<string>(async resolve => {
      page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.accept();
        resolve(message);
      });
    });
  }

  static async dismissAlert(page: Page): Promise<string> {
    return new Promise<string>(async resolve => {
      page.once('dialog', async dialog => {
        const message = dialog.message();
        await dialog.dismiss();
        resolve(message);
      });
    });
  }
}
