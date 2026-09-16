import request from "supertest";
import app from "../../src/app";
import { describe, it, expect, afterAll } from "@jest/globals";
import { prisma } from "../../src/config/prisma";

describe("Auth API", () => {
  const email = `auth-${Date.now()}@example.com`;
  const password = "Test@12345";

  // ========================================
  // CLEANUP
  // ========================================

  afterAll(async () => {
    try {
      const testUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (testUser) {
        await prisma.user.delete({
          where: {
            id: testUser.id,
          },
        });
      }
    } catch (error) {
      console.error("Auth test cleanup failed:", error);
    } finally {
      await prisma.$disconnect();
    }
  });

  // ========================================
  // REGISTER
  // ========================================

  describe("POST /api/v1/auth/register", () => {
    it("should register a new user", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "Test User",
          email,
          password,
        });

      expect(response.status).toBe(201);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty(
        "message",
        "User registered successfully",
      );
      expect(response.body).toHaveProperty("data");

      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user).toHaveProperty("id");
      expect(response.body.data.user).toHaveProperty("name", "Test User");
      expect(response.body.data.user).toHaveProperty("email", email);
      expect(response.body.data.user).toHaveProperty("role");

      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });

    it("should reject invalid registration data", async () => {
      const response = await request(app)
        .post("/api/v1/auth/register")
        .send({
          name: "",
          email: "invalid-email",
          password: "123",
        });

      expect(response.status).toBe(400);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", false);
    });
  });

  // ========================================
  // LOGIN
  // ========================================

  describe("POST /api/v1/auth/login", () => {
    it("should login with valid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email,
          password,
        });

      expect(response.status).toBe(200);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", true);
      expect(response.body).toHaveProperty(
        "message",
        "Login successful",
      );
      expect(response.body).toHaveProperty("data");

      expect(response.body.data).toHaveProperty("user");
      expect(response.body.data.user).toHaveProperty("id");
      expect(response.body.data.user).toHaveProperty("name", "Test User");
      expect(response.body.data.user).toHaveProperty("email", email);
      expect(response.body.data.user).toHaveProperty("role");

      expect(response.body.data).toHaveProperty("accessToken");
      expect(response.body.data).toHaveProperty("refreshToken");
    });

    it("should reject invalid credentials", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email,
          password: "WrongPassword@123",
        });

      expect(response.status).toBe(401);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", false);
    });

    it("should reject login with invalid request data", async () => {
      const response = await request(app)
        .post("/api/v1/auth/login")
        .send({
          email: "invalid-email",
          password: "123",
        });

      expect(response.status).toBe(400);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", false);
    });
  });

  // ========================================
  // CURRENT USER
  // ========================================

  describe("GET /api/v1/auth/me", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app).get("/api/v1/auth/me");

      expect(response.status).toBe(401);

      expect(response.body).toBeDefined();
      expect(response.body).toHaveProperty("success", false);
    });
  });
});