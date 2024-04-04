const { expect, test } = require('@playwright/test');
const { load_model } = require("../../utils/data_loader");
import { faker } from '@faker-js/faker/locale/en';

let baseURL, add_person_model;

test.beforeAll( async({ request }, testInfo )=> {
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

test.describe('API delete person tests @api', () => {
    
    test('should response with status code 404 when delete person by username', async ({ request }) => {
        await request.delete(`${baseURL}/user/${add_person_model.username}`);

        const get_deleted_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const deleted_person = await get_deleted_person_request.json();

        expect(get_deleted_person_request.status()).toBe(404);
        expect(deleted_person.message).toEqual("User not found");
    });
    
    test('should response with status code 200 when get non existing person by username', async ({ request }) => {
        const delete_request = await request.delete(`${baseURL}/user/010101010101001`);

        expect(delete_request.status()).toBe(404);
    });

})