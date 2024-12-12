import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

let userName = faker.internet.displayName('male');
let userMail = faker.internet.email('male');
let userPass = faker.internet.password('male');
let url = 'https://realworld.qa.guru/#/';

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

test('Пользователь может изменить био', async ({ page }) => {
let userBio = faker.person.bio()
  
  await page.locator('.dropdown-toggle').click();
  await page.getByRole('link', { name: 'Settings'}).click();
  await page.getByPlaceholder('Short bio about you').click();
  await page.getByPlaceholder('Short bio about you').fill(userBio);
  await page.getByRole('button','Udpate Settings');



  await expect(page.getByPlaceholder('Short bio about you')).toContainText(userBio);
});

});


/*
test('Авторизация логинн и пароль', async ({ page }) => {
  await page.goto(url);
  await page.getByRole('link', { name: 'Login' }).click();
  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill('niktest1@test.org');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('Nsps6Q');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('navigation')).toContainText('test');
}); */
