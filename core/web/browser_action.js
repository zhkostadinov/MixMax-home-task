// any browser action goes here. Like navigate, get current url etc.

exports.BrowserAction = class BrowserPage{

    constructor(page){
        this.page = page;
    }

    async navigate_to_url(url) {
        if (url) {
            await this.page.goto(url);
        } else {
            await this.page.goto('');
        }
    }

    async get_current_page_url(){
        return await this.page.url();
    }
}