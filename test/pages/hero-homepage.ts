import BasePage from "./base-page.ts";
import {
    getElementByHrefAndText,
    getElementByName,
    getElementByTypeAndText,
    PageElement
} from "../locators/index.ts";
import {HrefEnum} from "../constants/href.enum.ts";

export class HeroHomepage extends BasePage {

    get businessButton(): Promise<PageElement> {
        return getElementByHrefAndText({href: HrefEnum.BusinessPasswordManager, text: 'Business'});
    }

    get personalButton(): Promise<PageElement> {
        return getElementByHrefAndText({href: HrefEnum.PersonalPasswordManager, text: 'Personal'});
    }

    get startFreeTrialButton(): Promise<PageElement> {
        return getElementByHrefAndText({href: HrefEnum.TryPremium, text: 'Start Free Trial'});
    }

    get checkPlansButton(): Promise<PageElement> {
        return getElementByHrefAndText({href: HrefEnum.Plans, text: 'Check plans'});
    }

    get email(): Promise<PageElement> {
        return getElementByName('email');
    }

    get getStartedButton(): Promise<PageElement> {
        return getElementByTypeAndText('submit', 'Get started');
    }

    async chosePersonalFreeTrial(): Promise<void> {
        const personalButton = await this.personalButton;
        const startTrialButton = await this.startFreeTrialButton;
        await this.waitElementDisplayed(personalButton);
        await personalButton.click();
        await this.waitElementDisplayed(startTrialButton);
        await startTrialButton.click();
    }

    async clickCheckPlansButton(): Promise<void> {
        const personalButton = await this.personalButton;
        const checkPlansButton = await this.checkPlansButton;
        await this.waitElementDisplayed(personalButton);
        await personalButton.click();
        await this.waitElementDisplayed(checkPlansButton);
        await checkPlansButton.click();
    }

    async setEmail(email: string): Promise<void> {
        await (await this.email).addValue(email);
        await (await this.getStartedButton).click();
    }

    async checkTitleText(expectedText: string): Promise<void> {
        const element = await $('h1.nord-text');
        await this.checkText(await element, expectedText);
    }
}