/* eslint-env jest */
const supertest = require("supertest");
const app = require("./app");

const request = supertest(app);

describe("Endpoints respond to requests", () => {
  it('Returns data and status 200 on request to "/"', () =>
    request.get("/").then((response) => {
      expect(response.status).toBe(200);
      expect(response.text).toBe("Hello, world!");
    }));
});
