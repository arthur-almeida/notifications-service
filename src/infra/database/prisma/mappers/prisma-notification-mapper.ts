import { Notification as RawNotification } from '@prisma/client';
import { Notification } from '@application/entities/Notification';
import { Content } from '@application/entities/Content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      category: notification.category,
      canceledAt: notification.canceledAt,
      content: notification.content.value,
      createdAt: notification.createdAt,
      readAt: notification.readAt,
      recipientId: notification.recipientId,
    };
  }

  static toDomain(raw: RawNotification) {
    return new Notification(
      {
        category: raw.category,
        canceledAt: raw.canceledAt,
        content: new Content(raw.content),
        createdAt: raw.createdAt,
        readAt: raw.readAt,
        recipientId: raw.recipientId,
      },
      raw.id,
    );
  }
}
