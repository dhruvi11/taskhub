import { z } from "zod";

export const uuidSchema = z.string().uuid();

export const projectIdSchema = z.object({
  projectId: z.string().uuid(),
});

export const taskParamsSchema = z.object({
  projectId: z.string().uuid(),
  taskId: z.string().uuid(),
});