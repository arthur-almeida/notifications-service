import { UnreadNotification } from './UnreadNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('UnreadNotification', () => {
  it('should be able to unread a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    const notification = new Notification(
      makeNotification({
        readAt: new Date(),
      }),
    );

    await notificationRepository.create(notification);
    await unreadNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const unreadNotification = new UnreadNotification(notificationRepository);

    expect(() =>
      unreadNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
