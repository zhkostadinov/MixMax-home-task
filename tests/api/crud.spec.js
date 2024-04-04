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

test.describe('API CRUD tests @api', () => {
    test('should response with status code 200 when add new person', async ({}) => {
        const response_post_request = await post_person_request.json();

        expect(post_person_request).toBeOK();
        expect(response_post_request.message).toBeDefined();
    });
    
    test('should response with status code 200 when get person by username', async ({ request }) => {
        const get_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const response_get_request = await get_request.json();

        expect(get_request).toBeOK();
        expect(add_person_model.username).toBe(response_get_request.username)
    });
    
    test('should response with status code 200 when update person firstName', async ({ request }) => {
        add_person_model.firstName = faker.person.firstName();
        await request.get(`${baseURL}/user/login?username=${add_person_model.username}&password=${add_person_model.password}`);

        await request.put(`${baseURL}/user/${add_person_model.username}`, { data: add_person_model});
        const get_updated_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const updatedPerson = await get_updated_person_request.json();

        expect(get_updated_person_request).toBeOK();
        expect(add_person_model.firstName).not.toEqual(updatedPerson.firstName)
    });

    test('should response with status code 200 when delete person', async ({ request }) => {
        await request.delete(`${baseURL}/user/${add_person_model.username}`);

        const get_deleted_person_request = await request.get(`${baseURL}/user/${add_person_model.username}`);
        const deleted_person = await get_deleted_person_request.json();

        expect(deleted_person.message).toEqual("User not found");
    });
})