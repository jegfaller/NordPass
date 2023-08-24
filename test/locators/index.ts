export type PageElement = WebdriverIO.Element;

export const forgeSelectorByDataLocator = (dataLocator: string): string => `[data-testid="${dataLocator}"]`;

export const forgeSelectorByHrefAndText = (href: string, text: string): string =>
    `//a[@href="${href}" and text()="${text}"]`;

export const forgeSelectorByName = (name: string): string => `[name="${name}"]`;

export const forgeSelectorByTypeAndText = (type: string, text: string): string =>
    `//button[@type="${type}" and text()="${text}"]`;



export const getElementByDataLocator = async (...locators: string[]): Promise<PageElement> =>
    $(locators.map((locator) => forgeSelectorByDataLocator(locator)).join(' '));

export const getElementByHrefAndText = async (...combinations: Array<{href: string, text: string}>): Promise<PageElement> =>
    $(combinations.map(comb => forgeSelectorByHrefAndText(comb.href, comb.text)).join(' | '));

export const getElementByName = async (name: string): Promise<PageElement> => $(forgeSelectorByName(name));

export const getElementByTypeAndText = async (type: string, text: string): Promise<PageElement> =>
    $(forgeSelectorByTypeAndText(type, text));
