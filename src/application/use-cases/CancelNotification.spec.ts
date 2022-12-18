import { CancelNotification } from './CancelNotification';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { Content } from '@application/entities/Content';
import { Notification } from '@application/entities/Notification';
import { NotificationNotFoundError } from './errors/notification-not-found';

describe('CancelNotification', () => {
  it('should be able to cancel a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    const notification = new Notification({
      category: 'social',
      content: new Content('Você recebeu uma nova solicitação de amizade'),
      recipientId: 'valid-recipient-id',
    });

    await notificationRepository.create(notification);
    await cancelNotification.execute({ notificationId: notification.id });

    expect(notificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const cancelNotification = new CancelNotification(notificationRepository);

    expect(() =>
      cancelNotification.execute({ notificationId: 'invalid-id' }),
    ).rejects.toThrow(NotificationNotFoundError);
  });
});
