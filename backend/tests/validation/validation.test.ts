import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("Validation", () => {
  it("should reject invalid login payload", async () => {
    const response = await request(app).post("/api/v1/auth/login").send({
      email: "not-an-email",
      password: "",
    });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("success", false);
  });

  it("should reject invalid registration payload", async () => {
    const response = await request(app).post("/api/v1/auth/register").send({
      name: "",
      email: "wrong-email",
      password: "",
    });

    expect(response.status).toBe(400);

    expect(response.body).toHaveProperty("code", "VALIDATION_ERROR");
  });
});
