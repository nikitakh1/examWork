import { BasePage } from './base.page';

export class MainPage extends BasePage {
    constructor(page) {
        super(page);
        this.logo = this.page.locator('.navbar-brand');
        this.menuButton = this.page.locator('.dropdown-toggle');
        this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
        this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
        this.profileButton = this.page.getByRole('link', { name: 'Profile' });
        this.logoutButton = this.page.locator('text=Logout'); // Локатор для кнопки выхода
        this.loginButton = this.page.locator('.nav-link', { hasText: 'Login' }); // Локатор для кнопки входа
        this.profileLink = this.page.getByRole('link', { name: 'Profile' }); // Локатор для ссылки на профиль
        this.userName = this.page.locator('.navbar .dropdown-toggle .user-pic'); // Локатор для изображения пользователя
    }

    async goToRegister() {
        await this.signupButton.click();
    }

    async goToSettings() {
        await this.menuButton.click();
        await this.settingsButton.click();
    }

    async goToProfile() {
        await this.menuButton.click();
        await this.profileButton.click();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutButton.click();
    }

    async goToLogin() {
        await this.loginButton.click();
    }
}