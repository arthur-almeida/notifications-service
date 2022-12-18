import { ReadNotification } from './ReadNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './errors/notification-not-found';
import { makeNotification } from '@test/factories/notification-factory';

describe('ReadNotification', () => {
  it('should be able to read a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    const notification = new Notification(makeNotification());

    await notificationRepository.create(notification);
    await readNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].readAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to read a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const readNotification = new ReadNotification(notificationRepository);

    expect(() =>
      readNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
