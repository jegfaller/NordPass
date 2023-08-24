import {HeaderPage} from "../pages/header-page.ts";
import {UrlEnum} from "../constants/url.enum.ts";
import {LoginPage} from "../pages/login-page.ts";

const headerPage = new HeaderPage();
const loginPage = new LoginPage();

describe('Login page', () => {
    beforeEach(async () => {
        await browser.reloadSession();
    });

    afterEach(async () => {
        await browser.deleteCookies();
    });

    it('All elements are displayed', async () => {
        await headerPage.open();
        await headerPage.moveToLoginDropdown();
        await headerPage.clickManageSubscriptionButton();

        await headerPage.waitNewWindowLoad(UrlEnum.LoginPage);

        await loginPage.checkAllElementsOfLoginPageAreDisplayed();
    });
});
