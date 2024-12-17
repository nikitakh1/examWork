import { test, expect } from '@playwright/test';
import { GetPostsService, CreatePostService, GetCommentsService, CreateCommentService, UpdatePostService, DeletePostService, PostDataGenerator, CommentDataGenerator } from '../src/helpers/index';

const postDataGenerator = new PostDataGenerator();
const commentDataGenerator = new CommentDataGenerator();

test.describe('Функциональные API тесты', () => {

  //Test1 - Получение списка постов
  test('GET /posts', async ({ request }) => {
    let getPostsService = new GetPostsService();
    let response = await getPostsService.get(request, '/posts');
    expect(response.status()).toBe(200);
    let posts = await response.json();
    expect(posts.length).toBeGreaterThan(0);
  });

  //Test2 - Создание нового поста
  test('POST /posts', async ({ request }) => {
    let createPostService = new CreatePostService();
    let newPost = postDataGenerator.generatePostData();
    let response = await createPostService.post(request, '/posts', newPost);
    expect(response.status()).toBe(201);
    let createdPost = await response.json();
    expect(createdPost.title).toBe(newPost.title);
    expect(createdPost.body).toBe(newPost.body);
    expect(createdPost.userId).toBe(newPost.userId);
  });

  //Test3 - Получение списка комментариев
  test('GET /comments', async ({ request }) => {
    let getCommentsService = new GetCommentsService();
    let response = await getCommentsService.get(request, '/comments');
    expect(response.status()).toBe(200);
    let comments = await response.json();
    expect(comments.length).toBeGreaterThan(0);
  });

  //Test4 - Создание нового комментария
  test('POST /comments', async ({ request }) => {
    let createCommentService = new CreateCommentService();
    let newComment = commentDataGenerator.generateCommentData();
    let response = await createCommentService.post(request, '/comments', newComment);
    expect(response.status()).toBe(201);
    let createdComment = await response.json();
    expect(createdComment.postId).toBe(newComment.postId);
    expect(createdComment.name).toBe(newComment.name);
    expect(createdComment.email).toBe(newComment.email);
    expect(createdComment.body).toBe(newComment.body);
  });

  //Test5 - Обновление существующего поста
  test('PUT /posts/1', async ({ request }) => {
    let updatePostService = new UpdatePostService();
    let updatedPostData = {
      id: 1,
      title: 'Updated Title',
      body: 'Updated Body',
      userId: 1,
    };
    let response = await updatePostService.put(request, '/posts/1', updatedPostData);
    expect(response.status()).toBe(200);
    let updatedPost = await response.json();
    expect(updatedPost.title).toBe(updatedPostData.title);
    expect(updatedPost.body).toBe(updatedPostData.body);
    expect(updatedPost.userId).toBe(updatedPostData.userId);
  });

  //Test6 - Удаление существующего поста
  test('DELETE /posts/1', async ({ request }) => {
    let deletePostService = new DeletePostService();
    let response = await deletePostService.delete(request, '/posts/1');
    expect(response.status()).toBe(200);
    let deletedPost = await response.json();
    expect(deletedPost).toEqual({});
  });
});