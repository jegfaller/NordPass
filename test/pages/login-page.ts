import BasePage from "./base-page.ts";
import {getElementByDataLocator, PageElement} from "../locators/index.ts";
import {LoginPageEnum} from "../locators/login-page.enum.ts";

export class LoginPage extends BasePage {
    get identifierInput(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.IdentifierInput);
    }
    get passwordInput(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.PasswordInput);
    }
    get continueButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.ContinueButton);
    }
    get logInButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.LogInButton);
    }
    get signInWithAppleButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.SignInWithAppleButton);
    }
    get signInWithGoogleButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.SignInWithGoogleButton);
    }
    get signInWithCodeButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.SignInWithCodeButton);
    }
    get businessEmailInput(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.BusinessEmailInput);
    }

    get businessEmailSubmitButton(): Promise<PageElement> {
        return getElementByDataLocator(LoginPageEnum.BusinessEmailSubmitButton);
    }

    async checkAllElementsOfLoginPageAreDisplayed(): Promise<void>{
        await this.waitElementDisplayed(await this.identifierInput);
        await this.assertElementIsDisplayed(await this.identifierInput);
        await this.assertElementIsDisplayed(await this.continueButton);
        await this.assertElementIsDisplayed(await this.signInWithAppleButton);
        await this.assertElementIsDisplayed(await this.signInWithGoogleButton);
        await this.assertElementIsDisplayed(await this.signInWithCodeButton);
    }

    async checkBusinessLoginFormIsDisplayed(): Promise <void>{
        await this.waitElementDisplayed(await this.businessEmailInput);
        await this.assertElementIsDisplayed(await this.businessEmailInput);
        await this.assertElementIsDisplayed(await this.businessEmailSubmitButton);

    }
}