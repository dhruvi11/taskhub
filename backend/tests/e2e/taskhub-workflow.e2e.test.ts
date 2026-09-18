import request from "supertest";
import app from "../../src/app";
import { describe, it, expect } from "@jest/globals";

describe("TaskHub primary user journey", () => {
  let accessToken = "";
  let memberToken = "";
  let projectId = "";
  let taskId = "";

  const timestamp = Date.now();

  const owner = {
    name: `E2E Owner ${timestamp}`,
    email: `e2e-owner-${timestamp}@example.com`,
    password: "Password@123",
  };

  const member = {
    name: `E2E Member ${timestamp}`,
    email: `e2e-member-${timestamp}@example.com`,
    password: "Password@123",
  };

  it("signup owner", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(owner);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
  });

  it("login owner", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: owner.email,
        password: owner.password,
      });

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);

    accessToken = response.body.data.accessToken;

    expect(accessToken).toBeTruthy();
  });

  it("signup member", async () => {
    const response = await request(app)
      .post("/api/v1/auth/register")
      .send(member);

    expect(response.status).toBe(201);
  });

  it("login member", async () => {
    const response = await request(app)
      .post("/api/v1/auth/login")
      .send({
        email: member.email,
        password: member.password,
      });

    expect(response.status).toBe(200);

    memberToken = response.body.data.accessToken;

    expect(memberToken).toBeTruthy();
  });

  it("creates project", async () => {
    const response = await request(app)
      .post("/api/v1/projects")
      .set("Authorization", `Bearer ${accessToken}`)
      .send({
        name: `E2E Project ${timestamp}`,
        description: "E2E project",
      });

    expect(response.status).toBe(201);

    projectId = response.body.data.id;

    expect(projectId).toBeTruthy();
  });

  // Continue using your existing project-member endpoint,
  // task endpoint, assign endpoint and complete endpoint.
});