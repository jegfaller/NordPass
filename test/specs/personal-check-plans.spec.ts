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

    it('Check plans', async () => {

        await homePage.open();
        await homePage.clickCheckPlansButton()

        await homePage.waitUrlChanges(UrlEnum.PlansPage);

        await homePage.checkTitleText(HeaderTextEnum.GetYourPlan);
    });
});
