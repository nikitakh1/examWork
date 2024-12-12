import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { ArticleBuilder } from '../src/helpers/index';
import { UserBuilder } from '../src/helpers/index';
import { App } from '../src/pages/app.page';


const url = 'https://realworld.qa.guru/#/';
let newUser;
let newArcticle;
let app;


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


/*
test('Статья отображается в профиле пользователя', async ({ page }) => {
 //const mainPage = new MainPage(page);
 //const articlePage = new ArticlePage (page);


 await app.articlePage.goToNewArticle();
 await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
 await app.mainPage.goToProfile();


 await expect(page.locator('h1')).toContainText(newArcticle.articleTitle);
 await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleAbout);
 await expect(page.getByRole('main')).toContainText(newArcticle.articleTag);


 ///проверить


});
*/


/*
test('Пользователь удаляет статью (1 статья)', async ({ page }) => {
 //const mainPage = new MainPage(page);
 //const articlePage = new ArticlePage (page);


 await app.articlePage.goToNewArticle();
 await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
 await app.articlePage.deleteArticle();
 await app.mainPage.goToProfile();


 await expect(page.getByText(newArcticle.articleTextNew)).toBeVisible();
 await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleTextNew);
 await expect(page.getByRole('main')).toContainText('fdfrd doesn\'t have articles.');
});
*/


});
