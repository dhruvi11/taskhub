import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name cannot exceed 100 characters")
    .optional(),

  email: z
    .string()
    .email("Invalid email address")
    .optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;