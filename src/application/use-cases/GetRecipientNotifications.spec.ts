import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notification.repository';
import { makeNotification } from '@test/factories/notification-factory';
import { GetRecipientNotifications } from './GetRecipientNotifications';

describe('GetRecipientNotifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(makeNotification());
    await notificationRepository.create(makeNotification());
    await notificationRepository.create(
      makeNotification({
        recipientId: 'valid-recipient-id-2',
      }),
    );

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'valid-recipient-id',
    });

    expect(notificationRepository.notifications).toHaveLength(3);
    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'valid-recipient-id' }),
        expect.objectContaining({ recipientId: 'valid-recipient-id' }),
      ]),
    );
  });
});
