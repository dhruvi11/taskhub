import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("Authorization", () => {
  it("should prevent access without authentication", async () => {
    const response = await request(app).get("/api/v1/projects");

    expect(response.status).toBe(401);
  });

  it("should prevent task access without authentication", async () => {
    const response = await request(app).get(
      "/api/v1/projects/test-project-id/tasks",
    );

    expect(response.status).toBe(401);
  });

  it("should prevent project creation without authentication", async () => {
    const response = await request(app).post("/api/v1/projects").send({
      name: "Unauthorized Project",
    });

    expect(response.status).toBe(401);
  });
});
