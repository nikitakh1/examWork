import {expect} from '@playwright/test';
import {test} from '../src/helpers/fixtures/fixture';


/* const url = 'https://realworld.qa.guru/#/';
let newUser; */
let app;

test.describe('Builder',() => {
   /* test.beforeEach( async ({ page }) => {
        newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();
        app = new App(page);
        await app.mainPage.open(url);
        await app.mainPage.goToRegister();
        await app.registerPage.enterUsername(newUser.userName);
        await app.registerPage.enterEmail(newUser.userEmail);
        await app.registerPage.enterPassword(newUser.userPassword);
        await app.registerPage.clickSignup();
    }); */

    test('Пользователь может изменить bio. Page Object - junior version', async ({ registerFixture }) => {
        console.log(process.env.NODE_ENV);
        await registerFixture.mainPage.goToSettings();
        await registerFixture.settingsPage.enterUserBio('newUser.userBio');
        await registerFixture.settingsPage.updateProfileSimple();
        await expect(registerFixture.settingsPage.bioField).toContainText('newUser.userBio');
    });
    test('Две фикстуры', async ({ registerFixture, webApp }) => {
        // Подготовка данных Act Given
        await registerFixture;
        // Сам тест Arrange When

        await webApp.mainPage.goToSettings();
        await webApp.settingsPage.enterUserBio('newUser.userBio');
        await webApp.settingsPage.updateProfileSimple();
        
        
        // Проверка ОР и ФР Assert Then

        await expect(webApp.settingsPage.bioField).toContainText('newUser.userBio');
    });
});