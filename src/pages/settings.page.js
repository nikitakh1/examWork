import {BasePage} from './base.page';

export class SettingsPage extends BasePage {
constructor (page) {
    super(page);
    this.updateButton = page.getByRole('button','Update Settings');
    this.bioField = this.page.getByPlaceholder('Short bio about you');
    this.photoField = this.page.getByPlaceholder('URL of profile picture');
    this.nameField = this.page.getByPlaceholder('Your Name');
    this.emailField = this.page.getByPlaceholder('Email');
    this.errorMessage = this.page.locator('.error-messages');
}

async enterUserBio (bio) {
    await this.bioField.click();
    await this.bioField.fill(bio);
}

async updateProfileSimple () {
    await this.updateButton.click();
}
async getProfile () {
    const user = {
        bio: await this.bioField
    }
  return user;
}

async updateProfile (bio = '') {
    await this.bioField.click();
    await this.bioField.fill(bio);
    await this.updateButton.click();
}

async getUrlPhoto () {
    const urlph = {
        photo: await this.photoField.inputValue()
    }
  return urlph;
}

async enterUrlPhoto (photo = '') {
    await this.photoField.click();
    await this.photoField.fill(photo)
    await this.updateButton.click();
}

async getName () {
    const newname = {
        name: await this.nameField.inputValue()
    }
  return newname;
}

async enterNewName (name = '') {
    await this.nameField.click();
    await this.nameField.fill(name)
    await this.updateButton.click();
}

async enterNewEmail (email = '') {
    await this.emailField.click();
    await this.emailField.fill(email)
    await this.updateButton.click();
}

async register(name, email, password) {
    await this.nameField.fill(name);
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.registerButton.click();
}

async getErrorMessage() {
    return await this.errorMessage.textContent();
}

} 