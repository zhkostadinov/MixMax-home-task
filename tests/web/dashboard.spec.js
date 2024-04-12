const {test, expect} = require('@playwright/test');
const { load_test_data } = require("../../utils/data_loader");
const { BrowserAction } = require('../../core/web/browser_action');
const { PageAction } = require('../../core/web/page_action');
const { ElementAction } = require('../../core/web/element_action');

let ui_elements, browserAction, pageAction, elementAction;

test.describe("Dashboard tests @web", ()=> {

    test.beforeEach(async({ page })=> {
        ui_elements = await load_test_data('ui_elements_vault');

        browserAction = new BrowserAction(page);
        pageAction = new PageAction(page);
        elementAction = new ElementAction(page);
        await browserAction.navigate_to_url();
    });

    test.afterEach(async({ page })=> {
        await page.close();
    });

    test(`should land on dashboard page`, async ({ baseURL }) => {
        const current_url = await browserAction.get_current_page_url();

        expect(current_url).toBe(baseURL);
    });

    test(`should login sucessfully`, async ({}) => {
        await pageAction.click(ui_elements.login_page.sign_in_link);
        await elementAction.fill(ui_elements.login_page.username_input, process.env.MIXMAX_STATIC_USERNAME);
        await elementAction.fill(ui_elements.login_page.password_input, process.env.MIXMAX_STATIC_PASSWORD);
        await pageAction.click(ui_elements.login_page.log_in_btn);

        const sign_out = await elementAction.get_element_text(ui_elements.dashboard_page.sign_out_link);
        const my_account = await elementAction.get_element_text(ui_elements.dashboard_page.my_account_link); 

        expect(sign_out).toBe("Sign Out");
        expect(my_account).toBe("My Account");
    });

});