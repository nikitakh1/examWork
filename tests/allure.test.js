import { test, expect } from '@playwright/test';
// import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/app.page';
import { MainPage, RegisterPage, SettingsPage } from '../src/pages/index';
import { allure } from "allure-playwright";

const url = 'https://realworld.qa.guru/#/';
let newUser;
let app;

test.describe.only('Builder ',() => {
    test.beforeEach( async ({ page }) => {

newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();

app = new App(page);

/* newUser = {
    userBio : faker.music.genre(),
    userEmail: faker.internet.email(),
    userName : faker.person.firstName('female'),
    userPassword : faker.internet.password(),
    userPasswordFail : faker.internet.password({ length: 3 }),
 };*/
    
    //const mainPage = new MainPage(page);
    //const registerPage = new RegisterPage(page);
 
    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await allure.step("Ввести имя пользователя", async () => {
    await app.registerPage.enterUsername(newUser.userName);
        });
    await app.registerPage.enterEmail(newUser.userEmail);
    await app.registerPage.enterPassword(newUser.userPassword);
    await app.registerPage.clickSignup();
      });

test('Пользователь может изменить bio. Page Object - junior version', async ({ page }) => {
    //const mainPage = new MainPage(page);
    //const settingsPage = new SettingsPage(page);
    await allure.owner("Nikita Khakhilev");
    await allure.tags("smoke", "UI", "regress", "profile");
    await allure.severity(Severity.CRITICAL);
    await allure.link("https://example.com/docs", "Related Documentation");
    await allure.issue("AUTH-123", "https://example.com/issues/AUTH-123");
    await allure.tms("TMS-456", "https://example.com/tms/TMS-456");

    await allure.parentSuite("Web interface");
    await allure.suite("Essential features");
    await allure.subSuite("Authentication");
    await allure.epic("Web interface");
    await allure.feature("Essential features");
    await allure.story("Authentication");
    await app.mainPage.goToSettings();
    await app.settingsPage.enterUserBio(newUser.userBio);
    await app.settingsPage.updateProfileSimple();
    await expect(app.settingsPage.bioField).toContainText(newUser.userBio);
});
});