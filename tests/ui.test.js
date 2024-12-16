import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { ArticleBuilder, UserBuilder } from '../src/helpers/index';

const url = 'https://realworld.qa.guru/#/';
let newUser;
let app;
let newArcticle;

test.describe('Тесты на профиль пользователя',() => {
    test.beforeEach( async ({ page }) => {

newUser = new UserBuilder().addBio().addEmail().addName().addPassword().addNewName().addNewEmail().generate();

app = new App(page);
 
    await app.mainPage.open(url);
    await app.mainPage.goToRegister();
    await app.registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
      });

test('Пользователь может изменить Bio', async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.updateProfile(newUser.userBio);
    let profileInfo = await app.settingsPage.getProfile();
    await expect(profileInfo.bio).toHaveText(newUser.userBio);
});

test('Пользователь может добавить фото', async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.enterUrlPhoto(newUser.userPhoto);
    console.log('Expected URL:', newUser.userPhoto);
    console.log('Actual URL:', await app.settingsPage.photoField.inputValue());
    await expect(app.settingsPage.photoField).toHaveValue(newUser.userPhoto);

});

test('Пользователь может изменить имя', async ({ page }) => {
    console.log('First Expected Name:', newUser.userName);
    await app.mainPage.goToSettings();
    await app.settingsPage.enterNewName(newUser.userNewName);
    console.log('Expected Name:', newUser.userNewName);
    console.log('Actual Name:', await app.settingsPage.nameField.inputValue());
    await expect(app.settingsPage.nameField).toHaveValue(newUser.userNewName);
});

test('Пользователь может изменить email', async ({ page }) => {
    await app.mainPage.goToSettings();
    await app.settingsPage.enterNewEmail(newUser.userNewEmail);
    await expect(app.settingsPage.emailField).toHaveValue(newUser.userNewEmail);
});

test('Пользователь может успешно авторизоваться', async ({ page }) => {
  await app.mainPage.logout();
  await app.mainPage.goToLogin();
  await app.loginPage.login(newUser.userEmail, newUser.userPassword);
  const userNameElement = await app.mainPage.userName;
  await expect(userNameElement).toHaveAttribute('alt', newUser.userName);
  });

test('Пользователь может успешно выйти из системы', async ({ page }) => {
  await app.mainPage.logout();
  await expect(app.mainPage.loginButton).toBeVisible();
});

}); 

test.describe('Тесты на статьи пользователя',() => {
    test.beforeEach( async ({ page }) => {

newArcticle = new ArticleBuilder().addTitle().addAbout().addText().addTag().addTitleNew().addTextNew().addTagNew().generate();

newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();
 
app = new App(page);
 
await app.mainPage.open(url);
await app.mainPage.goToRegister();
await app.registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
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