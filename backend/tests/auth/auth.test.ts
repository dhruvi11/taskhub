import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("Auth API", () => {
  const email = `auth-${Date.now()}@example.com`;
  const password = "Test@12345";

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        name: "Test User",
        email,
        password,
      });

      expect(response.status).toBe(201);

      expect(response.body).toHaveProperty("success");
    });

    it("should reject invalid registration data", async () => {
      const response = await request(app).post("/api/v1/auth/register").send({
        name: "",
        email: "invalid-email",
        password: "123",
      });

      expect(response.status).toBe(400);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email,
        password,
      });

      expect([200, 201]).toContain(response.status);

      expect(response.body).toBeDefined();
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app).post("/api/v1/auth/login").send({
        email,
        password: "WrongPassword@123",
      });

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      expect(response.status).toBe(401);
    });
  });
});
