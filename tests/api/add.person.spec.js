const { expect, test } = require('@playwright/test');
const { load_model } = require("../../utils/data_loader");
import { faker } from '@faker-js/faker/locale/en';

let add_person_model;

test.beforeEach( async( {} )=> {
    add_person_model = await load_model('api_add_person');
    add_person_model.username = faker.internet.userName();
    add_person_model.firstName = faker.person.firstName();
    add_person_model.lastName = faker.person.lastName();
    add_person_model.email = faker.internet.email();
    add_person_model.password = faker.internet.password();
    add_person_model.phone = faker.phone.imei();

});

test.describe('API add person tests', {tag: '@api',}, () => {
    test('should response with status code 200 when add new person @api', async ({ request }) => {
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBeDefined();
    });
    
    test.skip('should not add person without username', async ({ request }) => {
        add_person_model.username = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person without firstName', async ({ request }) => {
        add_person_model.firstName = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person without lastName', async ({ request }) => {
        add_person_model.lastName = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person without email', async ({ request }) => {
        add_person_model.email = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person without password', async ({ request }) => {
        add_person_model.password = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person without phone', async ({ request }) => {
        add_person_model.phone = '';
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });

    test.skip('should not add new person when phone number is negative', async ({ request }) => {
        add_person_model.phone = -1234556789;
        const postPersonRequest = await request.post('user', { data: add_person_model} );
        const responsePostRequest = await postPersonRequest.json();

        expect(postPersonRequest).toBeOK();
        expect(responsePostRequest.message).toBe('');
    });
})