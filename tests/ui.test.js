import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/app.page';
import { ArticleBuilder } from '../src/helpers/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;
let app;
let newArcticle;

test.describe('Тесты на профиль пользователя',() => {
    test.beforeEach( async ({ page }) => {

//newUser = new UserBuilder().addBio().addEmail().addName().addPassword().addPhoto().addNewEmail().addNewName().generate();


newUser = {
    bio : faker.music.genre(),
    email: faker.internet.email(),
    name : faker.person.firstName(),
    password : faker.internet.password(),
    photo : faker.image.urlLoremFlickr(),
    newEmail: faker.internet.email({ firstName: 'test'}),
    newName: faker.person.firstName('female'),
 };
 

app = new App(page);
 
    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await app.registerPage.register(newUser.name, newUser.email, newUser.password);
      });

test('Пользователь может изменить Bio', async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.updateProfile(newUser.bio);
    let profileInfo = await app.settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.bio);
});

test('Пользователь может добавить фото', async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.enterUrlPhoto(newUser.photo);

    console.log('Expected URL:', newUser.photo);
    console.log('Actual URL:', await app.settingsPage.photoField.inputValue());

    /*let urlPhoto = await settingsPage.getUrlPhoto();*/
    await expect(app.settingsPage.photoField).toHaveValue(newUser.photo);

});

test('Пользователь может изменить имя', async ({ page }) => {
    console.log('First Expected Name:', newUser.name);
    //let newName = faker.person.firstName();
    await app.mainPage.goToSettings();
    await app.settingsPage.enterNewName(newUser.newName);
    
    console.log('Expected Name:', newUser.newName);
    console.log('Actual Name:', await app.settingsPage.nameField.inputValue());

    await expect(app.settingsPage.nameField).toHaveValue(newUser.newName);
});

test('Пользователь может изменить email', async ({ page }) => {
    //let newEmail = faker.internet.email();
    await app.mainPage.goToSettings();
    await app.settingsPage.enterNewEmail(newUser.newEmail);
    await expect(app.settingsPage.emailField).toHaveValue(newUser.newEmail);
});

test('Пользователь может успешно авторизоваться', async ({ page }) => {
  await app.mainPage.logout();
  await app.mainPage.goToLogin();
  await app.loginPage.login(newUser.email, newUser.password);
  //await page.waitForSelector('.navbar .dropdown-toggle .user-pic', { state: 'visible', timeout: 20000 }); // Ожидание видимости изображения пользователя
  const userNameElement = await app.mainPage.userName;
  await expect(userNameElement).toHaveAttribute('alt', newUser.name);
  });

test('Пользователь может успешно выйти из системы', async ({ page }) => {
  await app.mainPage.logout();
  await page.waitForSelector('.nav-link', { hasText: 'Login', state: 'visible', timeout: 20000 }); // Ожидание видимости кнопки входа
  await expect(app.mainPage.loginButton).toBeVisible();
});

}); 

test.describe('Тесты на статьи пользователя',() => {
    test.beforeEach( async ({ page }) => {

newArcticle = new ArticleBuilder().addTitle().addAbout().addText().addTag().addTitleNew().addTextNew().addTagNew().generate();

newUser = {
    bio : faker.music.genre(),
    email: faker.internet.email(),
    name : faker.person.firstName(),
    password : faker.internet.password(),
    photo : faker.image.urlPicsumPhotos()
 };

app = new App(page);
 
await app.mainPage.open(url);
await app.mainPage.goToRegister();
await app.registerPage.register(newUser.name, newUser.email, newUser.password);
});

test('Пользователь публикует статью', async ({ page }) => {
  await app.articlePage.goToNewArticle();
  await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);

  await expect(page.getByRole('heading', { name: newArcticle.articleTitle })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText(newArcticle.articleTitle);
  await expect(page.getByText(newArcticle.articleText)).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleText);
  await expect(page.getByText(newArcticle.articleTag)).toBeVisible();
  await expect(page.getByRole('main')).toContainText(newArcticle.articleTag);
  
});

test('Пользователь редактирует название статьи', async ({ page }) => {
  await app.articlePage.goToNewArticle();
  await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
  await app.articlePage.editArticle();
  await app.articlePage.publishNewTitle(newArcticle.articleTitleNew);
  await app.articlePage.updateArticle();

  await expect(page.getByRole('heading', { name: newArcticle.articleTitleNew })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText(newArcticle.articleTitleNew);

});

test('Пользователь редактирует текст статьи', async ({ page }) => {
  await app.articlePage.goToNewArticle();
  await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
  await app.articlePage.editArticle();
  await app.articlePage.publishNewText(newArcticle.articleTextNew);
  await app.articlePage.updateArticle();

  await expect(page.getByText(newArcticle.articleTextNew)).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleTextNew);

});

test('Проверка того, что невозможно отредактировать тег (после изменения остается старый тег)', async ({ page }) => {
  await app.articlePage.goToNewArticle();
  await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
  await app.articlePage.editArticle();
  await app.articlePage.publishNewTag(newArcticle.articleTagNew);
  await app.articlePage.updateArticle();

  await expect(page.getByText(newArcticle.articleTag)).toBeVisible();
  await expect(page.getByRole('main')).toContainText(newArcticle.articleTag);

});

});
