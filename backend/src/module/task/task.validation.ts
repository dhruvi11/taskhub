import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string().min(1, "Task title is required").max(200),

  description: z.string().max(5000).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).default("MEDIUM"),

  dueDate: z.string().datetime().optional(),

  assignedToId: z.string().uuid().optional(),
});

export const updateTaskSchema = z.object({
  title: z.string().min(1).max(200).optional(),

  description: z.string().max(5000).nullable().optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),

  dueDate: z.string().datetime().nullable().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),
});

export const taskQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),

  limit: z.coerce.number().int().min(1).max(100).default(10),

  search: z.string().trim().optional(),

  status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),

  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),

  assignedToId: z.string().uuid().optional(),

  sortBy: z
    .enum(["createdAt", "updatedAt", "dueDate", "title", "priority", "status"])
    .default("createdAt"),

  sortOrder: z.enum(["asc", "desc"]).default("desc"),
});

export const assignTaskSchema = z.object({
  assignedToId: z.string().uuid(),
});

export type UpdateTaskInput = z.infer<typeof updateTaskSchema>;
