import { expect, Page } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';
import { AlertUtils } from '../utils/alertUtils';
import { promises } from 'node:dns';

export class LoginPage{
    private page: Page;
    private usernameInput='#loginusername';
    private passwordInput='#loginpassword';
    private loginbutton='button:has-text("Log in")';
    private loginlogo='#logInModal';

    constructor(page:Page){
        this.page=page;
    }
    async isLoginPresent(): Promise<void> {
    await expect(this.page.locator(this.loginlogo)).toBeVisible();
  }
    async logininValidUser(usernamevalue:string,userpaswordvalue:string):Promise<string>{
        const username= this.page.locator(this.usernameInput);
        const userpassword= this.page.locator(this.passwordInput);

        await WaitUtils.waitForReady(username);
        await username.fill(usernamevalue);

        await WaitUtils.waitForReady(userpassword);
        await userpassword.fill(userpaswordvalue);

    // Use enhanced AlertUtils to get alert message

    const alertPromise=AlertUtils.acceptAlertWithMessage(this.page);
    await this.page.click(this.loginbutton);
    const alertMessage=await alertPromise;
    
    return alertMessage;
    }
    async loginValidUser(usernamevalue: string, userpaswordvalue: string): Promise<void> {
  await this.page.fill(this.usernameInput, usernamevalue);
  await this.page.fill(this.passwordInput, userpaswordvalue);
  await this.page.click(this.loginbutton);
}
}