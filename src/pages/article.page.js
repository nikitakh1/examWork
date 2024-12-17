import {BasePage} from './base.page';


export class ArticlePage extends BasePage {
   constructor (page) {
       super(page);
       this.newArticleButton = this.page.getByRole('link', { name: 'New Article' });
       this.publishArticle = this.page.getByRole('button', { name: 'Publish Article' });
       this.articleTitleField = this.page.getByPlaceholder('Article Title');
       this.articleAboutField = this.page.getByPlaceholder('What\'s this article about?');
       this.articleTextField = this.page.getByPlaceholder('Write your article (in');
       this.articleTagField = this.page.getByPlaceholder('Enter tags');
       this.editArticleButton = this.page.getByRole('link', { name: 'Edit Article' });
       this.updateArticleButton = this.page.getByRole('button', { name: 'Update Article' });
       this.deleteArticleButton = this.page.getByRole('button', { name: 'Delete Article' });


   }


async goToNewArticle () {
       await this.newArticleButton.click();
  
   }


async publishNewArticle (articleTitle = '', articleAbout = '', articleText = '', articleTag = '') {
   await this.articleTitleField.click();
   await this.articleTitleField.fill(articleTitle);
   await this.articleAboutField.click();
   await this.articleAboutField.fill(articleAbout);
   await this.articleTextField.click();
   await this.articleTextField.fill(articleText);
   await this.articleTagField.click();
   await this.articleTagField.fill(articleTag);
   await this.publishArticle.click();


}


async publishNewTitle (articleTitle) {
   await this.articleTitleField.click();
   await this.articleTitleField.fill(articleTitle);


}


async publishNewAbout (articleAbout) {
   await this.articleAboutField.click();
   await this.articleAboutField.fill(articleAbout);


}


async publishNewText (articleText) {
   await this.articleTextField.click();
   await this.articleTextField.fill(articleText);
}


async publishNewTag (articleTag) {
   await this.articleTagField.click();
   await this.articleTagField.fill(articleTag);
}


async editArticle () {
   await this.editArticleButton.nth(1).click();
}


async updateArticle () {
   await this.updateArticleButton.click();
}


async deleteArticle () {
   await this.deleteArticleButton.nth(1).click();


}


}
