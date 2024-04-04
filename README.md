## Main Concepts

Code decomposition.

There should be a balance between code and template engines (yml). Practicality is key

We follow  the industry good practices where applicable and sensible. Tests are following AAA pattern

Redefine the parallel execution as steps fan-out within the processing of single workflow execution, via N-N dependency (Batch array jobs) model.

IMPORTANT When adding dependency to the project (a package), be sure to list it in the package.json we use NPM.

Read the official Playwright documentation at https://playwright.dev/docs/intro

All sensitive data is kept as env vars. Passwords, accounts etc. are set as secrets.

Hermetic pattern states that every test should be completely independent and self-sufficient! This is achieved by proper Fixture strategies

Analyse the Workflow to Improve Concurrency. Always try to exploit concurrency in the user's workflow, so you could run tests in parallel.

Abstractions live longer than details, so when creating test logic, invest in the abstractions, not the concrete implementation. Abstractions can survive the barrage of changes from different implementations and new technologies.

Find bugs once! Once a human tester finds a bug, that should be the last time a human finds it! Consider automation feasibility and let Automation tests check those bugs from now on. Create bug-driven tests.

Convention over Configuration: It is better to utilise the playwright's support (config) for configuration instead of our own. We try to minimise OS reading and later on just use it in all configs. Implement enum for the configs, so all hardcoded data is in SSOT place.

Favour Dynamic over Static test data. New user, Disposable temporary e-mail addresses etc. should be part of Fresh Fixture.

Parallel test execution, horizontal scaling of Test agent/runner containers (due to virtualisation issues with non-GPU browser rendering). Always keep in mind the CI server execution, when creating tests.

Retry - retrying a certain number of times when a call to the app fails.

## Architecture

- [Playwright](https://playwright.dev/) to enable Web and Api tests
- [dotenv](https://www.npmjs.com/package/dotenv) that loads environment variables are to be injected in the configs

### Project structure breakdown 

`core` - contains the main FW functions organized like:

    api - conatins functionality and helpers for API calls. The idea is to support back door manipulation pattern etc.
    
    web - contains functionality and helpers fpr WEB calls. They are splitted in 3 different layers as:
         - browser - all actions performed with the browser instance goes here.
         - element - all actions performed over elements goes here.
         - page    - all actions performed over specific page goes here.
         The idea is not couple the implentation with specific page, elements adn page.

`models` - all models goes here

`test_data` - UI element locators, static data

`tests` - Web and Api tests splitted by functionallity

`utils` - Data loader           

## Development

`npm v6.14.7`

`node v14.21.0`

### CI/CD Running Tests
1. Add all listed env vars from `.env.test` in the environment. Depends on the runner, it will be one time operation.
2. Export them in `.env.test`.
4. Install needed depencies.
5. Run in CLI desired tests scope.

### Running Tests Locally
1. Setup your IDE to use the Playwright plugins
2. Add the all needed Environmental variables to your `.bashrc` file and `.env.test` files
3. Install dependencies with:

```sh
npx playwright install
npm i --save-dev
```
4. Run backend tests with:

```sh
npm run tests:api
```

5. Run Web tests with:

```sh
npm run tests:web
```

6. Run tests in interactive mode with:
```sh
npm run tests:it
```

