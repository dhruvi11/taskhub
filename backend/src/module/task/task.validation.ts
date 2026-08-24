import { z } from "zod";

export const createTaskSchema = z.object({
  title: z
    .string()
    .min(1, "Task title is required")
    .max(200),

  description: z
    .string()
    .max(5000)
    .optional(),

  priority: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT",
    ])
    .default("MEDIUM"),

  dueDate: z
    .string()
    .datetime()
    .optional(),

  assignedToId: z
    .string()
    .uuid()
    .optional(),
});

export const updateTaskSchema = z.object({
  title: z
    .string()
    .min(1)
    .max(200)
    .optional(),

  description: z
    .string()
    .max(5000)
    .nullable()
    .optional(),

  priority: z
    .enum([
      "LOW",
      "MEDIUM",
      "HIGH",
      "URGENT",
    ])
    .optional(),

  dueDate: z
    .string()
    .datetime()
    .nullable()
    .optional(),

  status: z
    .enum([
      "TODO",
      "IN_PROGRESS",
      "COMPLETED",
    ])
    .optional(),
});

export const assignTaskSchema = z.object({
  assignedToId: z.string().uuid(),
});