import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { MainPage, RegisterPage, SettingsPage } from '../src/pages/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;

test.describe('Page Object ',() => {
    test.beforeEach( async ({ page }) => {

newUser = {
    userBio : faker.music.genre(),
    userEmail: faker.internet.email(),
    userName : faker.person.firstName('female'),
    userPassword : faker.internet.password(),
    userPasswordFail : faker.internet.password({ length: 3 }),
 };
    const mainPage = new MainPage(page);
    const registerPage = new RegisterPage(page);
 
    await mainPage.open(url);
    await mainPage.goToRegister();
    await registerPage.enterUsername(newUser.userName);
    await registerPage.enterEmail(newUser.userEmail);
    await registerPage.enterPassword(newUser.userPassword);
    await registerPage.clickSignup();
      });

test('Пользователь может изменить bio. Page Object - junior version', async ({ page }) => {
    const mainPage = new MainPage(page);
    const settingsPage = new SettingsPage(page);

    await mainPage.goToSettings();
    await settingsPage.enterUserBio(newUser.userBio);
    await settingsPage.updateProfileSimple();
    await expect(settingsPage.bioField).toContainText(newUser.userBio);
});
});