import {assert} from "chai";
import {PageElement} from "../locators/index.ts";
import {UrlEnum} from "../constants/url.enum.ts";

export default class BasePage {
    async open() {
        await browser.url(UrlEnum.MainPage)
    }

    async waitElementDisplayed(element: PageElement, displayed = true, timeout = 10000): Promise<void> {
        await element.waitForDisplayed({

            timeout,
            interval: 500,
            reverse: !displayed,
            timeoutMsg: `PageElement ${element.selector} - ${displayed ? 'not displayed' : 'not disappeared'} `,
        });
    }

    async waitElementIsClickable(element: PageElement): Promise<void> {
        await element.waitForClickable({
            timeoutMsg: `PageElement ${element.selector} - is not clickable`,
        });
    }

    async waitUrlChanges(expectedUrlPart: string): Promise<void> {
        const initialUrl = await browser.getUrl();

        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl !== initialUrl && currentUrl.includes(expectedUrlPart);
            },
            {
                timeout: 5000,
                timeoutMsg: `expected url to change and include ${expectedUrlPart} after 5s, but it didn't`,
            }
        );
    }


    async waitNewWindowLoad(expectedUrlPart: string): Promise<void> {
        const initialUrl = await browser.getUrl();

        const allWindows = await browser.getWindowHandles();
        if (allWindows.length > 1) {
            await browser.switchToWindow(allWindows[allWindows.length - 1]);
        }

        await browser.waitUntil(
            async () => {
                const currentUrl = await browser.getUrl();
                return currentUrl !== initialUrl && currentUrl.includes(expectedUrlPart);
            },
            {
                timeout: 5000,
                timeoutMsg: `expected url to change and include ${expectedUrlPart} after 5s, but it didn't`,
            }
        );
    }

    async assertElementIsDisplayed(element: PageElement): Promise<void> {
        assert.isTrue(await element.isDisplayed(), `PageElement - ${element.selector} not displayed`);
    }

    async waitTextAppear(element: PageElement): Promise<void> {
        try {
            await browser.waitUntil(
                async () => {
                    const elementText = await element.getText();
                    return elementText.length > 1;
                },
                {
                    interval: 200,
                    timeoutMsg: 'Text inside element is not appeared',
                },
            );
        } catch (error) {
        }
    }

    async checkText(element: PageElement, expectedText: string): Promise<void> {
        await this.waitElementDisplayed(element);
        await this.waitTextAppear(element);

        let actualText;

        try {
            await browser.waitUntil(
                async () => {
                    actualText = await element.getText();
                    assert.equal(
                        expectedText,
                        actualText,
                        `Actual text - ${actualText} NOT EQUAL Expected - ${expectedText} text`,
                    );
                    return true;
                },
                {
                    timeout: 2500,
                    interval: 500,
                    timeoutMsg: "Location of the element isn't equal",
                },
            );
        } catch (error) {
            assert.equal(expectedText, actualText, `Actual text - ${actualText} NOT EQUAL Expected - ${expectedText} text`);
        }
    }

    generateRandomEmailBody(length: number = 10): string {
        const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const randomBody = Array.from({ length }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join('');
        return randomBody;
    }

    async useRandomEmail(): Promise<string> {
        const randomEmailBody = this.generateRandomEmailBody();
        const email = `${randomEmailBody}@gmail.com`;
        return email;
    }
}
