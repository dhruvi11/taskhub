import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("Projects API", () => {
  describe("GET /api/v1/projects", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .get("/api/v1/projects");

      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/v1/projects", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .post("/api/v1/projects")
        .send({
          name: "Test Project",
          description: "Project created from Jest",
        });

      expect(response.status).toBe(401);
    });
  });
});