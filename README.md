<h1 align="center">Дипломный проект по автоматизации тестирования JS + Playwright</h1>

## ℹ️ Содержание
- <a href="#description"> Описание проекта</a>
- <a href="#cases"> Тест-кейсы</a>
- <a href="#install"> Начало работы над проектом и установка зависимостей</a>
- <a href="#autotests"> Запуск автотестов</a>
- <a href="#generateAllureReport"> Генерация отчетов</a>
- <a href="#jenkins"> Сборка в Jenkins</a>
- <a href="#allureReport"> Пример Allure-отчета</a>
- <a href="#allureTestOpsReport"> Пример Allure TestOps-отчета</a>
- <a href="#tg"> Уведомления в Telegram </a>

## 📜 <a name="description"></a> Описание проекта

Этот проект представляет собой дипломную работу по автоматизации тестирования веб-приложений и API с использованием JavaScript и Playwright. Основная цель проекта — создание надежной и масштабируемой системы автоматизированного тестирования, которая позволяет проверять функциональность веб-приложений и API, а также генерировать отчеты о результатах тестирования.

Тесты разработаны на языке JavaScript с использованием фреймворка для автоматизации тестирования Playwright. При проектировании тестов был применён паттерн PageObject, что обеспечивает удобство поддержки и масштабируемость тестов.

Проект включает в себя:
- Написание UI тестов для проверки функциональности профиля пользователя и статей.
- Написание API тестов для работы с постами и комментариями.
- Интеграцию с Allure для генерации отчетов.
- Настройку Jenkins и GitHub Actions для автоматической сборки и запуска тестов. Это позволяет автоматически генерировать Allure-отчеты и отправлять результаты тестирования в Allure TestOps.
- Отправку уведомлений в Telegram с помощью бота, что обеспечивает оперативное уведомление о статусе тестирования.
  
## 🕵️‍♂️ <a name="cases"></a> Тест-кейсы

В проекте реализованы следующие тест-кейсы:

- UI тесты:
  - Проверка функциональности профиля пользователя
    - Пользователь может изменить Bio
    - Пользователь может добавить фото
    - Пользователь может изменить имя
    - Пользователь может изменить email
    - Пользователь может успешно авторизоваться
    - Пользователь может успешно выйти из системы
  - Проверка функциональности статей пользователя
    - Пользователь публикует статью
    - Пользователь редактирует название статьи
    - Пользователь редактирует текст статьи
    - Проверка того, что невозможно отредактировать тег (после изменения остается старый тег)

- API тесты:
  - Получение списка постов
  - Создание нового поста
  - Получение списка комментариев
  - Создание нового комментария
  - Обновление существующего поста
  - Удаление существующего поста

## ▶️ <a name="install"></a> Начало работы над проектом и установка зависимостей

1. Клонируйте репозиторий:
   ```sh
   git clone https://github.com/nikitakh1/examWork.git
   ```

2. Перейдите в директорию проекта:
   ```sh
   cd examWork
   ```

3. Установите зависимости:
   ```sh
   npm install
   ```
   
4. Установите Playwright фреймворк:
   ```sh
   npm init playwright@latest
   ```

5. Установите Allure:
   ```sh
   npm install --save-dev @playwright/test allure-playwright
   ```

6. Создайте файл `.env` в корне проекта и добавьте переменные окружения:
   ```env
   BASE_URL=https://realworld.qa.guru
   API_BASE_URL=https://jsonplaceholder.typicode.com
   ```

## 🎬 <a name="autotests"></a> Запуск автотестов

### Запуск всех тестов

Для запуска всех тестов используйте следующую команду:
```sh
npx t
```
### Запуск всех тестов в debug режиме

Для запуска всех тестов в debug режиме используйте следующую команду:
```sh
npm run debug
```

### Запуск тестов для конкретного проекта

#### Запуск UI тестов (проект `chromium`)
```sh
npm run testUI
```

#### Запуск API тестов (проект `api`)
```sh
npm run testApi
```

## 📝 <a name="generateAllureReport"></a> Генерация отчетов Allure

1. После выполнения тестов сгенерируйте отчет Allure:
   ```sh
   npm run allureGenerate
   ```

2. Откройте сгенерированный отчет:
   ```sh
   npm run allureOpen
   ```

<a name="jenkins"></a>
## <img width="20" style="vertical-align:middle" title="Jenkins" src="media/Jenkins_logo.svg.png"> </a> Сборка в <a target="_blank" href="https://jenkins.autotests.cloud/job/001-nikitakh1-examauto/"> Jenkins </a>

Для доступа в <code>Jenkins</code> потребуется пройти регистрацию на платформе [Jenkins](https://jenkins.autotests.cloud/). Для запуска сборки необходимо нажать кнопку <code>Build now</code>.
<p align="center">
<img title="jenkins" src="media/Jenkins1.png ">
</p>
После завершения сборки в разделе <code>Build History</code> можно перейти на страницу этой сборки, кликнув по ее номеру. На странице будут доступны сгенерированные отчеты в Allure TestOps и Allure Report.
<p align="center">
<img title="jenkins" src="media/Jenkins2.png ">
</p>

## <img width="20" style="vertical-align:middle" title="allureReport" src="media/allure.png"> <a name="allureReport"></a> Пример <a target="_blank" href="https://jenkins.autotests.cloud/job/001-nikitakh1-examauto/19/allure/#"> Allure-отчета </a>

<p align="center">
<img title="allureReport" src="media/allure1.png ">
</p>

<p align="center">
<img title="allureReport" src="media/allure2.png ">
</p>

## <img width="20" style="vertical-align:middle" title="allureTestOpsReport" src="media/testops.logo.svg"> <a name="allureTestOpsReport"></a> Пример <a target="_blank" href="https://allure.autotests.cloud/launch/43259"> Allure Testops-отчета </a>

<p align="center">
<img title="allureReport" src="media/testops.png ">
</p>

## <img width="20" style="vertical-align:middle" title="tg" src="media/tg.svg.png"> <a name="tg"></a> Уведомления в Telegram

Для отправки ботом, созданным в <code>Telegram</code>, сообщения с отчетом о результатах запуска автотестов в чат необходимо выполнить следующие команды:
1. Запустите тесты:
   ```sh
   npx t
   ```
2. Выполните команду, для генерации Allure отчета и отправки результатов в <code>Telegram-чат</code>:
   ```sh
   npm run generateAndSendTG
   ```
<p align="center">
<img title="jenkins" src="media/tgreport.png ">
</p>
