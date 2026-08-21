import { Request, Response } from "express";

import { ProjectMemberService } from "../services/project-member.service";

import {
  addMemberSchema,
  updateMemberRoleSchema,
} from "../module/project/project-member.validation";

export class ProjectMemberController {
  constructor(
    private readonly service: ProjectMemberService
  ) {}

  listMembers = async (
    req: Request,
    res: Response
  ) => {
    const members =
      await this.service.listMembers(
        req.params.projectId
      );

    return res.status(200).json({
      success: true,
      message: "Project members fetched successfully",
      data: members,
    });
  };

  addMember = async (
    req: Request,
    res: Response
  ) => {
    const data =
      addMemberSchema.parse(req.body);

    const member =
      await this.service.addMember(
        req.params.projectId,
        data.userId,
        data.role
      );

    return res.status(201).json({
      success: true,
      message: "Project member added successfully",
      data: member,
    });
  };

  updateMemberRole = async (
    req: Request,
    res: Response
  ) => {
    const data =
      updateMemberRoleSchema.parse(req.body);

    const member =
      await this.service.updateMemberRole(
        req.params.projectId,
        req.params.userId,
        data.role
      );

    return res.status(200).json({
      success: true,
      message: "Project member role updated successfully",
      data: member,
    });
  };

  removeMember = async (
    req: Request,
    res: Response
  ) => {
    const result =
      await this.service.removeMember(
        req.params.projectId,
        req.params.userId
      );

    return res.status(200).json({
      success: true,
      message: "Project member removed successfully",
      data: result,
    });
  };
}