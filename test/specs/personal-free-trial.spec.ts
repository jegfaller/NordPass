import {HeroHomepage} from "../pages/hero-homepage.ts";
import {UrlEnum} from "../constants/url.enum.ts";
import {HeaderTextEnum} from "../constants/header-text.enum.ts";

const homePage = new HeroHomepage()

describe('Login page', () => {
    before(async () => {
        await browser.reloadSession();
    });

    after(async () => {
        await browser.deleteCookies();
    });

    it('All elements are displayed', async () => {

        await homePage.open();
        await homePage.chosePersonalFreeTrial();
        await homePage.setEmail(await homePage.useRandomEmail());

        await homePage.waitUrlChanges(UrlEnum.DownloadPage);

        await homePage.checkTitleText(HeaderTextEnum.ThankForChoseNordPass);
    });
});
