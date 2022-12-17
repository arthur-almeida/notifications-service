import { SendNotification } from './SendNotification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notification.repository';

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const notificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(notificationRepository);

    const { notification } = await sendNotification.execute({
      recipientId: 'valid-recipient-id',
      category: 'social',
      content: 'this is a notification',
    });

    expect(notificationRepository.notifications).toHaveLength(1);
    expect(notificationRepository.notifications[0]).toEqual(notification);
  });
});
