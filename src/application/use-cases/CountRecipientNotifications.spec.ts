import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { CountRecipientNotifications } from './CountRecipientNotifications';
import { makeNotification } from '@test/factories/notification-factory';

describe('CountRecipientNotifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(makeNotification());
    await notificationRepository.create(makeNotification());
    await notificationRepository.create(
      makeNotification({
        recipientId: 'valid-recipient-id-2',
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'valid-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(3);
    expect(count).toBe(2);
  });
});
