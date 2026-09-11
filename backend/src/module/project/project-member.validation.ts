import { z } from "zod";

export const addMemberSchema = z.object({
  userId: z.string().uuid(),
  role: z.enum(["MANAGER", "MEMBER"]).default("MEMBER"),
});

export const updateMemberRoleSchema = z.object({
  role: z.enum(["MANAGER", "MEMBER"]),
});

export type AddMemberInput = z.infer<typeof addMemberSchema>;

export type UpdateMemberRoleInput = z.infer<typeof updateMemberRoleSchema>;
