import { Notification } from '../entities/Notification';
import { SendNotification } from './SendNotification';

const notifications: Notification[] = [];

const notificationRepository = {
  async create(notification: Notification) {
    notifications.push(notification);
  },
};

describe('SendNotification', () => {
  it('should be able to send a notification', async () => {
    const sendNotification = new SendNotification(notificationRepository);

    await sendNotification.execute({
      recipientId: 'valid-recipient-id',
      category: 'social',
      content: 'this is a notification',
    });

    expect(notifications).toHaveLength(1);
  });
});
