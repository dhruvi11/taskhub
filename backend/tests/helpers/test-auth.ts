import request from "supertest";
import app from "../../src/app";

export async function registerTestUser(
  name = "Test User",
  email = `test-${Date.now()}@example.com`,
  password = "Test@12345",
) {
  const response = await request(app).post("/api/v1/auth/register").send({
    name,
    email,
    password,
  });

  return {
    response,
    email,
    password,
  };
}

export async function loginTestUser(email: string, password: string) {
  const response = await request(app).post("/api/v1/auth/login").send({
    email,
    password,
  });

  return response;
}
