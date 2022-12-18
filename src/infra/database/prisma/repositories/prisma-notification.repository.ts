import { Notification } from 'src/application/entities/Notification';
import { NotificationRepository } from 'src/application/repositories/notification.repository';
import { PrismaService } from '../prisma.service';

export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    await this.prismaService.notification.create({
      data: {
        id: notification.id,
        category: notification.category,
        content: notification.content.value,
        createdAt: notification.createdAt,
        readAt: notification.readAt,
        recipientId: notification.recipientId,
      },
    });
  }
}
