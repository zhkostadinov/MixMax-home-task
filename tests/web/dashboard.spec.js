const {test, expect} = require('@playwright/test');
const { load_test_data } = require("../../utils/data_loader");
const { BrowserAction } = require('../../core/web/browser_action');
const { ElementAction } = require('../../core/web/element_action');

let ui_elements, browserAction, pageAction, elementAction;

test.describe("Dashboard tests", {tag: '@web',}, ()=> {

    test.beforeEach(async({ page })=> {
        ui_elements = await load_test_data('ui_elements_vault');

        browserAction = new BrowserAction(page);
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
        await elementAction.click(ui_elements.login_page.sign_in_link);
        await elementAction.fill(ui_elements.login_page.email_input, process.env.STATIC_EMAIL);
        await elementAction.fill(ui_elements.login_page.password_input, process.env.STATIC_PASSWORD);
        await elementAction.click(ui_elements.login_page.login_btn);

        const sign_out = await elementAction.get_element_text(ui_elements.dashboard_page.logout_btn);
        const my_account = await elementAction.get_element_text(ui_elements.dashboard_page.delete_my_account_btn); 

        expect(sign_out).toBe(" Logout");
        expect(my_account).toBe(" Delete Account");
    });

});