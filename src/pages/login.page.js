import { BasePage } from './base.page';

export class LoginPage extends BasePage {
    constructor(page) {
        super(page);
        this.emailInput = this.page.locator('input[type="email"]');
        this.passwordInput = this.page.locator('input[type="password"]');
        this.loginButton = this.page.locator('button.btn.btn-lg.btn-primary.pull-xs-right');
    }

    async login(email, password) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }
}