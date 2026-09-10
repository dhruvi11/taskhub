import {
  Request,
  Response,
} from "express";

import {
  prisma,
} from "../config/prisma";

export class NotificationController {
  registerDeviceToken = async (
    req: Request,
    res: Response
  ) => {
    const userId =
      req.user!.userId;

    const {
      token,
      platform,
    } = req.body;

    if (
      !token ||
      typeof token !== "string"
    ) {
      return res.status(400).json({
        success: false,
        message:
          "FCM token is required",
      });
    }

    if (
      !["android", "ios"].includes(
        platform
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Platform must be android or ios",
      });
    }

    const deviceToken =
      await prisma.deviceToken.upsert({
        where: {
          token,
        },

        update: {
          userId,
          platform,
          updatedAt: new Date(),
        },

        create: {
          token,
          userId,
          platform,
        },
      });

    return res.status(200).json({
      success: true,
      message:
        "Device token registered successfully",
      data: deviceToken,
    });
  };

  removeDeviceToken = async (
    req: Request,
    res: Response
  ) => {
    const userId =
      req.user!.userId;

    const { token } =
      req.body;

    if (!token) {
      return res.status(400).json({
        success: false,
        message:
          "FCM token is required",
      });
    }

    await prisma.deviceToken.deleteMany({
      where: {
        token,
        userId,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "Device token removed successfully",
    });
  };
}