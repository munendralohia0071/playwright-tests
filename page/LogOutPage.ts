import { Page,expect } from "@playwright/test";

export class logoutpage{

    private page:Page
    constructor(page:Page){
        this.page=page;
    }
    private logout='//a[@id="logout2"]';

    async Logout(){
        await this.page.locator(this.logout).click();

    }
}