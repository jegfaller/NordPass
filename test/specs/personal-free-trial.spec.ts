import {HeroHomepage} from "../pages/hero-homepage.ts";
import {UrlEnum} from "../constants/url.enum.ts";
import {HeaderTextEnum} from "../constants/header-text.enum.ts";

const homePage = new HeroHomepage()

describe('Personal plan', () => {
    before(async () => {
        await browser.reloadSession();
    });

    after(async () => {
        await browser.deleteCookies();
    });

    it('Get free trail', async () => {

        await homePage.open();
        await homePage.chosePersonalFreeTrial();
        await homePage.setEmail(await homePage.useRandomEmail());

        await homePage.waitUrlChanges(UrlEnum.DownloadPage);

        await homePage.checkTitleText(HeaderTextEnum.ThankForChoseNordPass);
    });
});
