import { Request, Response } from "express";

import { UserService } from "../services/user.service";

import {
  updateProfileSchema,
} from "../module/user/user.validation";

export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  getCurrentProfile = async (
    req: Request,
    res: Response
  ) => {
    const userId =
      req.user!.userId;

    const user =
      await this.userService.getCurrentProfile(
        userId
      );

    return res.status(200).json({
      success: true,
      message:
        "Profile fetched successfully",
      data: user,
    });
  };

  updateProfile = async (
    req: Request,
    res: Response
  ) => {
    const userId =
      req.user!.userId;

    const validatedData =
      updateProfileSchema.parse(
        req.body
      );

    const user =
      await this.userService.updateProfile(
        userId,
        validatedData
      );

    return res.status(200).json({
      success: true,
      message:
        "Profile updated successfully",
      data: user,
    });
  };

  updateAvatar = async (
    req: Request,
    res: Response
  ) => {
    const { avatarUrl } =
      req.body;

    if (
      typeof avatarUrl !== "string" ||
      !avatarUrl.trim()
    ) {
      return res.status(400).json({
        success: false,
        message:
          "avatarUrl is required",
      });
    }

    const user =
      await this.userService.updateAvatar(
        req.user!.userId,
        avatarUrl
      );

    return res.status(200).json({
      success: true,
      message:
        "Profile image updated successfully",
      data: user,
    });
  };
}