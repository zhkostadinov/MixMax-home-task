const { expect, test } = require('@playwright/test');
// const { test } = require("../../tests-data/static_data");
const { load_model } = require("../../utils/data_loader");
import { faker } from '@faker-js/faker/locale/en';

let baseURL, add_person_model;

test.beforeEach( async({ request }, testInfo )=> {
    baseURL = testInfo.config.projects.filter(p => p.name == 'API')[0].use.baseURL;
    add_person_model = await load_model('api_add_person');
    add_person_model.username = faker.internet.userName();
    add_person_model.firstName = faker.person.firstName();
    add_person_model.lastName = faker.person.lastName();
    add_person_model.email = faker.internet.email();
    add_person_model.password = faker.internet.password();
    add_person_model.phone = faker.phone.imei();

    await request.post(`${baseURL}/user`, { data: add_person_model} );
});

test.describe('API get person tests @api', () => {
    
    test('should response with status code 200 when get person by username', async ({ request }) => {
        const get_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const respons_get_request = await get_request.json();

        expect(get_request).toBeOK();
        expect(add_person_model.username).toBe(respons_get_request.username)
    });
    
    test('should response with status code 404 when get non existing person by username', async ({ request }) => {
        const get_request = await request.get(`${baseURL}/user/010101010101001`);
        const respons_get_request = await get_request.json();

        expect(get_request.status()).toBe(404);
        expect(respons_get_request.message).toBe('User not found')
    });

})