

import { test, expect } from '@playwright/test';
import { App } from '../src/pages/app.page';
import { ArticleBuilder, UserBuilder } from '../src/helpers/index';
import { allure } from 'allure-playwright';

const url = 'https://realworld.qa.guru/#/';
let newUser;
let app;
let newArcticle;

test.describe('Тесты на профиль пользователя', () => {
  test.beforeEach(async ({ page }) => {
    newUser = new UserBuilder().addBio().addEmail().addName().addPassword().addNewName().addNewEmail().generate();
    app = new App(page);

    await allure.step('Открыть веб-сайт', async () => {
      await app.mainPage.open(url);
    });

    await allure.step('Перейти на страницу регистрации', async () => {
      await app.mainPage.goToRegister();
    });

    await allure.step('Зарегистрировать нового пользователя', async () => {
      await app.registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
    });
  });

  test('Пользователь может изменить Bio', async ({ page }) => {
    allure.epic('Тестирование функциональности профиля');
    allure.feature('Профиль пользователя');
    allure.displayName('Изменение Bio пользователя');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'профиль');
    allure.severity('normal');
    allure.story('Изменение Bio');

    await allure.step('Перейти на страницу настроек', async () => {
      await app.mainPage.goToSettings();
    });

    await allure.step('Обновить профиль', async () => {
      await app.settingsPage.updateProfile(newUser.userBio);
    });

    await allure.step('Проверить, что Bio обновлено', async () => {
      let profileInfo = await app.settingsPage.getProfile();
      await expect(profileInfo.bio).toHaveText(newUser.userBio);
    });
  });

  test('Пользователь может добавить фото', async ({ page }) => {
    allure.displayName('Добавление фото пользователя');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'профиль');
    allure.severity('normal');
    allure.story('Добавление фото');

    await allure.step('Перейти на страницу настроек', async () => {
      await app.mainPage.goToSettings();
    });

    await allure.step('Ввести URL фото', async () => {
      await app.settingsPage.enterUrlPhoto(newUser.userPhoto);
    });

    await allure.step('Проверить, что URL фото введен', async () => {
      await expect(app.settingsPage.photoField).toHaveValue(newUser.userPhoto);
    });
  });

  test('Пользователь может изменить имя', async ({ page }) => {
    allure.displayName('Изменение имени пользователя');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'профиль');
    allure.severity('normal');
    allure.story('Изменение имени');

    await allure.step('Перейти на страницу настроек', async () => {
      await app.mainPage.goToSettings();
    });

    await allure.step('Ввести новое имя', async () => {
      await app.settingsPage.enterNewName(newUser.userNewName);
    });

    await allure.step('Проверить, что новое имя введено', async () => {
      await expect(app.settingsPage.nameField).toHaveValue(newUser.userNewName);
    });
  });

  test('Пользователь может изменить email', async ({ page }) => {
    allure.displayName('Изменение email пользователя');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'профиль');
    allure.severity('normal');
    allure.story('Изменение email');

    await allure.step('Перейти на страницу настроек', async () => {
      await app.mainPage.goToSettings();
    });

    await allure.step('Ввести новый email', async () => {
      await app.settingsPage.enterNewEmail(newUser.userNewEmail);
    });

    await allure.step('Проверить, что новый email введен', async () => {
      await expect(app.settingsPage.emailField).toHaveValue(newUser.userNewEmail);
    });
  });

  test('Пользователь может успешно авторизоваться', async ({ page }) => {
    allure.displayName('Успешная авторизация пользователя');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'авторизация');
    allure.severity('critical');
    allure.story('Авторизация');

    await allure.step('Выйти из системы', async () => {
      await app.mainPage.logout();
    });

    await allure.step('Перейти на страницу входа', async () => {
      await app.mainPage.goToLogin();
    });

    await allure.step('Авторизоваться', async () => {
      await app.loginPage.login(newUser.userEmail, newUser.userPassword);
    });

    await allure.step('Проверить, что пользователь авторизован', async () => {
      const userNameElement = await app.mainPage.userName;
      await expect(userNameElement).toHaveAttribute('alt', newUser.userName);
    });
  });

  test('Пользователь может успешно выйти из системы', async ({ page }) => {
    allure.displayName('Успешный выход из системы');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'авторизация');
    allure.severity('critical');
    allure.story('Выход из системы');

    await allure.step('Выйти из системы', async () => {
      await app.mainPage.logout();
    });

    await allure.step('Проверить, что пользователь вышел из системы', async () => {
      await expect(app.mainPage.loginButton).toBeVisible();
    });
  });
});

test.describe('Тесты на статьи пользователя', () => {
  test.beforeEach(async ({ page }) => {
    newArcticle = new ArticleBuilder().addTitle().addAbout().addText().addTag().addTitleNew().addTextNew().addTagNew().generate();
    newUser = new UserBuilder().addBio().addEmail().addName().addPassword().generate();
    app = new App(page);

    await allure.step('Открыть веб-сайт', async () => {
      await app.mainPage.open(url);
    });

    await allure.step('Перейти на страницу регистрации', async () => {
      await app.mainPage.goToRegister();
    });

    await allure.step('Зарегистрировать нового пользователя', async () => {
      await app.registerPage.register(newUser.userName, newUser.userEmail, newUser.userPassword);
    });
  });

  test('Пользователь публикует статью', async ({ page }) => {
    allure.epic('Тестирование функциональности статей');
    allure.feature('Статьи пользователя');
    allure.displayName('Публикация статьи пользователем');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'статьи');
    allure.severity('critical');
    allure.story('Публикация статьи');

    await allure.step('Перейти на страницу новой статьи', async () => {
      await app.articlePage.goToNewArticle();
    });

    await allure.step('Опубликовать новую статью', async () => {
      await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
    });

    await allure.step('Проверить, что статья опубликована', async () => {
      await expect(page.getByRole('heading', { name: newArcticle.articleTitle })).toBeVisible();
      await expect(page.getByRole('heading')).toContainText(newArcticle.articleTitle);
      await expect(page.getByText(newArcticle.articleText)).toBeVisible();
      await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleText);
      await expect(page.getByText(newArcticle.articleTag)).toBeVisible();
      await expect(page.getByRole('main')).toContainText(newArcticle.articleTag);
    });
  });

  test('Пользователь редактирует название статьи', async ({ page }) => {
    allure.displayName('Редактирование названия статьи');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'статьи');
    allure.severity('critical');
    allure.story('Редактирование названия статьи');

    await allure.step('Перейти на страницу новой статьи', async () => {
      await app.articlePage.goToNewArticle();
    });

    await allure.step('Опубликовать новую статью', async () => {
      await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
    });

    await allure.step('Редактировать статью', async () => {
      await app.articlePage.editArticle();
    });

    await allure.step('Опубликовать новое название', async () => {
      await app.articlePage.publishNewTitle(newArcticle.articleTitleNew);
    });

    await allure.step('Обновить статью', async () => {
      await app.articlePage.updateArticle();
    });

    await allure.step('Проверить, что новое название видимо', async () => {
      await expect(page.getByRole('heading', { name: newArcticle.articleTitleNew })).toBeVisible();
      await expect(page.getByRole('heading')).toContainText(newArcticle.articleTitleNew);
    });
  });

  test('Пользователь редактирует текст статьи', async ({ page }) => {
    allure.displayName('Редактирование текста статьи');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'статьи');
    allure.severity('critical');
    allure.story('Редактирование текста статьи');

    await allure.step('Перейти на страницу новой статьи', async () => {
      await app.articlePage.goToNewArticle();
    });

    await allure.step('Опубликовать новую статью', async () => {
      await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
    });

    await allure.step('Редактировать статью', async () => {
      await app.articlePage.editArticle();
    });

    await allure.step('Опубликовать новый текст', async () => {
      await app.articlePage.publishNewText(newArcticle.articleTextNew);
    });

    await allure.step('Обновить статью', async () => {
      await app.articlePage.updateArticle();
    });

    await allure.step('Проверить, что новый текст видим', async () => {
      await expect(page.getByText(newArcticle.articleTextNew)).toBeVisible();
      await expect(page.getByRole('paragraph')).toContainText(newArcticle.articleTextNew);
    });
  });

  test('Проверка того, что невозможно отредактировать тег (после изменения остается старый тег)', async ({ page }) => {
    allure.displayName('Проверка невозможности редактирования тега');
    allure.owner('Никита Хахилев');
    allure.tags('регресс', 'статьи');
    allure.severity('critical');
    allure.story('Редактирование тега');

    await allure.step('Перейти на страницу новой статьи', async () => {
      await app.articlePage.goToNewArticle();
    });

    await allure.step('Опубликовать новую статью', async () => {
      await app.articlePage.publishNewArticle(newArcticle.articleTitle, newArcticle.articleAbout, newArcticle.articleText, newArcticle.articleTag);
    });

    await allure.step('Редактировать статью', async () => {
      await app.articlePage.editArticle();
    });

    await allure.step('Опубликовать новый тег', async () => {
      await app.articlePage.publishNewTag(newArcticle.articleTagNew);
    });

    await allure.step('Обновить статью', async () => {
      await app.articlePage.updateArticle();
    });

    await allure.step('Проверить, что старый тег все еще видим', async () => {
      await expect(page.getByText(newArcticle.articleTag)).toBeVisible();
      await expect(page.getByRole('main')).toContainText(newArcticle.articleTag);
    });
  });
});