import { Notification } from '@application/entities/Notification';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      content: notification.content.value,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      recipientId: notification.recipientId,
    };
  }
}
