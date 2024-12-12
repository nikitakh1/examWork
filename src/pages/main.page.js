import {BasePage} from './base.page';

export class MainPage extends BasePage {
constructor (page) {
    super(page);
    this.logo = this.page.locator('.navbar-brand');
    this.menuButton = this.page.locator('.dropdown-toggle');
    this.settingsButton = this.page.getByRole('link', { name: 'Settings' });
    this.signupButton = this.page.getByRole('link', { name: 'Sign up' });
    this.profileButton = this.page.getByRole('link', { name: 'Profile' });
}

async goToRegister () {
    await this.signupButton.click();
}

async goToSettings () {
    //todo Вынести меню в компонент
    //await this.page.waitForSelector('.dropdown-toggle', { state: 'visible', timeout: 10000 });
    await this.menuButton.click();
    await this.settingsButton.click();
}

async goToProfile () {
    //await this.page.waitForSelector('.dropdown-toggle', { state: 'visible', timeout: 10000 });
    await this.menuButton.click();
    await this.profileButton.click();
}

}