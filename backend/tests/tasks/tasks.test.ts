import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("Tasks API", () => {
  const projectId = "test-project-id";

  describe("GET /api/v1/projects/:projectId/tasks", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app).get(
        `/api/v1/projects/${projectId}/tasks`,
      );

      expect(response.status).toBe(401);
    });
  });

  describe("POST /api/v1/projects/:projectId/tasks", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app)
        .post(`/api/v1/projects/${projectId}/tasks`)
        .send({
          title: "Test Task",
          description: "Test task description",
        });

      expect(response.status).toBe(401);
    });
  });

  describe("GET /api/v1/projects/:projectId/tasks/:id", () => {
    it("should reject unauthenticated requests", async () => {
      const response = await request(app).get(
        `/api/v1/projects/${projectId}/tasks/test-task-id`,
      );

      expect(response.status).toBe(401);
    });
  });
});
