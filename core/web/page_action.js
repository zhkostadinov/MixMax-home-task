// any page action goes here. Like click, scroll etc.

exports.PageAction = class PageAction{

    constructor(page){
        this.page = page;
    }

    async click(locator) {
        await this.page.waitForSelector(locator);
        await this.page.click(locator); 
    }

}