// any element action goes here. Like fill, get text etc.

exports.ElementAction = class ElementAction{

    constructor(page){
        this.page = page;
    }

    async fill(locator, input) {
        await this.page.waitForSelector(locator);
        await this.page.locator(locator).fill(input);
    }

    async get_element_text(locator) {
        await this.page.waitForSelector(locator, { state: 'attached' });
        return await this.page.locator(locator).textContent();
    }

    async click(locator) {
        await this.page.waitForSelector(locator);
        await this.page.click(locator); 
    }

    async click_by_visible_text(text) {
        await this.page.getByText(text).click();
    }
}