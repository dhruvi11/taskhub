import { MulticastMessage } from "firebase-admin/messaging";

import { firebaseMessaging } from "../config/firebase";

export class NotificationService {
  async sendPushNotification({
    tokens,
    title,
    body,
    data = {},
  }: {
    tokens: string[];
    title: string;
    body: string;
    data?: Record<string, string>;
  }) {
    if (!tokens.length) {
      return {
        successCount: 0,
        failureCount: 0,
      };
    }

    const message: MulticastMessage = {
      tokens,

      notification: {
        title,
        body,
      },

      data,
    };

    const response = await firebaseMessaging.sendEachForMulticast(message);

    return {
      successCount: response.successCount,

      failureCount: response.failureCount,
    };
  }
}

export const notificationService = new NotificationService();
