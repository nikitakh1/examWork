import { MainPage, SettingsPage, RegisterPage, ArticlePage, LoginPage } from './index';

export class App {
    constructor(page) {
        this.page = page;
        this.mainPage = new MainPage(page);
        this.registerPage = new RegisterPage(page);
        this.settingsPage = new SettingsPage(page);
        this.articlePage = new ArticlePage(page);
        this.loginPage = new LoginPage(page);
    }
};