import { Request, Response } from "express";
import { UserService } from "../services/user.service";
import { updateProfileSchema } from "../module/user/user.validation";

export class UserController {
  constructor(private readonly userService: UserService) {}

  getCurrentProfile = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user.userId;

    const user =
      await this.userService.getCurrentProfile(userId);

    return res.status(200).json({
      success: true,
      message: "Profile fetched successfully",
      data: user,
    });
  };

  updateProfile = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user.userId;

    const validatedData =
      updateProfileSchema.parse(req.body);

    const user =
      await this.userService.updateProfile(
        userId,
        validatedData
      );

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: user,
    });
  };

  uploadAvatar = async (
    req: Request,
    res: Response
  ) => {
    const userId = req.user.userId;

    const file = req.file;

    if (!file) {
      return res.status(400).json({
        success: false,
        message: "Avatar file is required",
      });
    }

    /*
     * For Milestone 6:
     * We prepare the upload flow.
     *
     * Later this file can be uploaded to:
     * AWS S3
     * or
     * Firebase Storage
     */

    const avatarUrl = `pending-upload/${file.originalname}`;

    const user =
      await this.userService.updateAvatar(
        userId,
        avatarUrl
      );

    return res.status(200).json({
      success: true,
      message: "Avatar upload prepared successfully",
      data: {
        user,
        file: {
          originalName: file.originalname,
          mimeType: file.mimetype,
          size: file.size,
        },
      },
    });
  };
}