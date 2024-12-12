import { test as base } from '@playwright/test';
import { UserBuilder } from '../builders/index';
import { App } from '../../pages/index';

const url = 'https://realworld.qa.guru/#/';

export const test = base.extend({
 // defaultItem: ['Something nice', { option: true }],

  // Нейминг
  registerFixture: async ({ page }, use) => {

    const newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();
    const app = new App(page);

    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await app.registerPage.register(newUser.name, newUser.email, newUser.password);

    // В максимально простом стиле
    /* 
    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await app.registerPage.enterUsername(newUser.userName);
    await app.registerPage.enterEmail(newUser.userEmail);
    await app.registerPage.enterPassword(newUser.userPassword);
    await app.registerPage.clickSignup();
    */
    await use(app);
  },
  webApp: async ({ page }, use) => {
    const app = new App(page);
    await use(app);
  },
});

export { expect } from '@playwright/test';