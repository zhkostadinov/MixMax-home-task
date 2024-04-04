const { expect, test } = require('@playwright/test');
const { load_model } = require("../../utils/data_loader");
import { faker } from '@faker-js/faker/locale/en';

let baseURL, add_person_model, post_person_request;

test.beforeEach( async({ request }, testInfo )=> {
    baseURL = testInfo.config.projects.filter(p => p.name == 'API')[0].use.baseURL;
    add_person_model = await load_model('api_add_person');
    add_person_model.username = faker.internet.userName();
    add_person_model.firstName = faker.person.firstName();
    add_person_model.lastName = faker.person.lastName();
    add_person_model.email = faker.internet.email();
    add_person_model.password = faker.internet.password();
    add_person_model.phone = faker.phone.imei();

    post_person_request = await request.post(`${baseURL}/user`, { data: add_person_model } );
});

test.describe('API update logged person tests @api', () => {
    test('should response with status code 200 when update person username', async ({ request }) => {
        const original_username = add_person_model.username; 
        add_person_model.username = faker.internet.userName();
        await request.get(`${baseURL}/user/login?username=${original_username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${original_username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${original_username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(original_username).not.toEqual(updated_person.firstName)
    });
    
    test('should response with status code 200 when update person firstName', async ({ request }) => {
        add_person_model.firstName = faker.person.firstName();
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.firstName).not.toEqual(updated_person.firstName)
    });

    test('should response with status code 200 when update person lastName', async ({ request }) => {
        add_person_model.lastName = faker.person.lastName();
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.lastName).not.toEqual(updated_person.lastName)
    });

    test('should response with status code 200 when update person email', async ({ request }) => {
        add_person_model.email = faker.internet.email();
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.email).not.toEqual(updated_person.email)
    });

    test('should response with status code 200 when update person password', async ({ request }) => {
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);
        add_person_model.password = faker.internet.password();

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.password).not.toEqual(updated_person.password)
    });

    test('should response with status code 200 when update person phone', async ({ request }) => {
        add_person_model.phone = faker.phone.imei();
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updated_person = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.phone).not.toEqual(updated_person.phone)
    });
})