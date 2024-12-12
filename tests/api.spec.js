import { test, expect } from "@playwright/test";
import { ChallengerService } from '../src/services/challenger.service';
import { ChallengesService } from '../src/services/challenges.service';

let challenger = new ChallengerService();
let challenges = new ChallengesService();

test.describe("API challenge v2", () => {
  let token;

  test.beforeAll(async ({ }) => {
    // Запросить ключ авторизации
    let r = await challenger.post();
    token = r.headers["x-challenger"];
    expect(r.headers).toEqual(
      expect.objectContaining({ "x-challenger": expect.any(String) }),
    );
  });

  test("Получить список заданий GET /challenges @API", async ({ }) => {
    const headers = {
      "x-challenger": token,
    };
    let response = await challenges.get(headers);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
    expect(response.data.challenges.length).toBe(59);
  });

  test("Получить список задач GET /todos @API", async ({ }) => {
    const headers = {
      "x-challenger": token,
    };
    let response = await challenges.getTodos(headers);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("Получить заголовки задач HEAD /todos @API", async ({ }) => {
    const headers = {
      "x-challenger": token,
    };
    let response = await challenges.headTodos(headers);
    expect(response.status).toBe(200);
    expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("Создать задачу POST /todos (201) @API", async ({ }) => {
    const headers = {
      "x-challenger": token,
      "Content-Type": "application/json",
    };
    const body = {
      title: "New Todo",
      doneStatus: false,
      description: "This is a new todo"
    };
    let response = await challenges.postTodos(headers, body);
    expect(response.status).toBe(201);
    expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });

  test("Создать задачу с неверным статусом POST /todos (400) @API", async ({ }) => {
    const headers = {
      "x-challenger": token,
      "Content-Type": "application/json",
    };
    const body = {
      title: "New Todo",
      doneStatus: "invalid", // Неверный статус
      description: "This is a new todo"
    };
    let response = await challenges.postTodos(headers, body);
    expect(response.status).toBe(400);
    expect(response.headers).toEqual(expect.objectContaining({ "x-challenger": token }));
  });
});