import {getElementByDataLocator, PageElement} from "../locators/index.ts";
import {HeaderEnum} from "../locators/header.enum.ts";
import BasePage from "./base-page.ts";

export class HeaderPage extends BasePage {

    get loginButton(): Promise<PageElement> {
        return getElementByDataLocator(HeaderEnum.LoginButton);
    }

    get nordAccountLoginButton(): Promise<PageElement> {
        return getElementByDataLocator(HeaderEnum.NordAccountLoginButton);
    }

    get adminPanelLoginButton(): Promise<PageElement> {
        return getElementByDataLocator(HeaderEnum.AdminPanelLoginButton);
    }

    async moveToLoginDropdown(): Promise<void> {
        const loginButton = await this.loginButton;
        await this.waitElementDisplayed(loginButton);
        await loginButton.moveTo();
    }

    async clickManageSubscriptionButton(): Promise<void> {
        const accountLoginButton = await this.nordAccountLoginButton;
        await this.waitElementIsClickable(accountLoginButton);
        await accountLoginButton.click();
    }
    async clickBusinessPanelButton(): Promise<void> {
        const businessLoginButton = await this.adminPanelLoginButton;
        await this.waitElementIsClickable(businessLoginButton);
        await businessLoginButton.click();
    }

}