import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let userName = faker.internet.displayName('male');
let userMail = faker.internet.email('male');
let userPass = faker.internet.password('male');
let url = 'https://realworld.qa.guru/#/';
let articleTitle = faker.lorem.sentence(5);
let articleAbout = faker.lorem.sentence(10);
let articleText = faker.lorem.sentence(35);
let articleTag = faker.lorem.word();

test.describe('Профиль пользователя',() => {
    test.beforeEach( async ({ page }) => {
      await page.goto(url);
      await page.getByRole('link', { name: 'Sign up' }).click();
      await page.getByPlaceholder('Your Name').click();
      await page.getByPlaceholder('Your Name').fill(userName);
      await page.getByPlaceholder('Email').click();
      await page.getByPlaceholder('Email').fill(userMail);
      await page.getByPlaceholder('Password').click();
      await page.getByPlaceholder('Password').fill(userPass);
      await page.getByRole('button', { name: 'Sign up' }).click();
      await expect(page.getByText(userName)).toBeVisible();
      await expect(page.getByRole('navigation')).toContainText(userName);
    });

test('Пользователь публикует статью', async ({ page }) => {

  /* await page.goto('https://realworld.qa.guru/#/');
  await page.getByRole('link', { name: 'Sign up' }).click();
  await page.getByPlaceholder('Your Name').click();
  await page.getByPlaceholder('Your Name').fill('refrefe');
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('frefre@fsr.org');
  await page.getByPlaceholder('Password').fill('d');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('dsfr3fg3r33r');
  await page.getByRole('button', { name: 'Sign up' }).click(); */

  await page.getByRole('link', { name: 'New Article' }).click();
  await page.getByPlaceholder('Article Title').click();
  await page.getByPlaceholder('Article Title').fill(articleTitle);
  await page.getByPlaceholder('What\'s this article about?').click();
  await page.getByPlaceholder('What\'s this article about?').fill(articleAbout);
  await page.getByPlaceholder('Write your article (in').click();
  await page.getByPlaceholder('Write your article (in').fill(articleText);
  await page.getByPlaceholder('Enter tags').click();
  await page.getByPlaceholder('Enter tags').fill(articleTag);
  await page.getByRole('button', { name: 'Publish Article' }).click();
  await expect(page.getByRole('heading', { name: articleTitle })).toBeVisible();
  await expect(page.getByRole('heading')).toContainText(articleTitle);
  await expect(page.getByText(articleText)).toBeVisible();
  await expect(page.getByRole('paragraph')).toContainText(articleText);
  await expect(page.getByText(articleTag)).toBeVisible();
  await expect(page.getByRole('main')).toContainText(articleTag);
});

});