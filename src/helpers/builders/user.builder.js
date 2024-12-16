import { faker } from '@faker-js/faker';

export class UserBuilder {

    constructor() {
        this.userEmail = '';
        this.userName = '';
        this.userPassword = '';
        this.userBio = '';
        this.userPhoto = '';
        this.userNewEmail = '';
        this.userNewName = '';
      }

    addEmail() {
        this.userEmail = faker.internet.email();
        return this;
    }

    addName() {
        this.userName = faker.person.firstName('female');
        return this;
    }

    addPassword() {
        this.userPassword = faker.internet.password();
        return this;
    }

    addBio() {
        this.userBio = faker.music.genre();
        return this;
    }

    addPhoto() {
        this.userPhoto = faker.image.urlLoremFlickr();
        return this;
    }

    addNewEmail() {
        this.userNewEmail = faker.internet.email({ firstName: 'test'});
        return this;
    }

    addNewName() {
        this.userNewName = faker.person.firstName('female');
        return this;
    }

    generate() {
        const copied = structuredClone (
            {
            userEmail: this.userEmail,
            userName: this.userName,
            userPassword: this.userPassword,
            userBio: this.userBio,
            userPhoto: this.userPhoto,
            userNewEmail: this.userNewEmail,
            userNewName: this.userNewName
        }
    );

    return copied;

    } 
}

