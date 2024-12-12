import { faker } from '@faker-js/faker';

export class ArticleBuilder {
    addTitle() {
        this.articleTitle = faker.lorem.sentence(3);
        return this;
    }

    addText() {
        this.articleText = faker.lorem.text();
        return this;
    }

    addAbout() {
        this.articleAbout = faker.lorem.sentence(1);
        return this;
    }

    addTag() {
        this.articleTag = faker.lorem.word();
        return this;
    }

    addTitleNew() {
        this.articleTitleNew = faker.lorem.sentence(5);
        return this;
    }

    addTextNew() {
        this.articleTextNew = faker.lorem.text(21);
        return this;
    }

    addTagNew() {
        this.articleTagNew = faker.lorem.word();
        return this;
    }

    generate() {
        const copiedArticle = structuredClone (
            {
            articleTitle: this.articleTitle,
            articleAbout: this.articleAbout,
            articleText: this.articleText,
            articleTag: this.articleTag,
            articleTitleNew: this.articleTitleNew,
            articleTextNew: this.articleTextNew,
            articleTagNew: this.articleTagNew,
        }
    );

    return copiedArticle;

    } 
}

