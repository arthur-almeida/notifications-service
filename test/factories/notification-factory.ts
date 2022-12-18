import { Content } from '@application/entities/Content';
import {
  Notification,
  NotificationProps,
} from '@application/entities/Notification';

type Override = Partial<NotificationProps>;

export function makeNotification(override: Override = {}) {
  return new Notification({
    category: 'social',
    content: new Content('Você recebeu uma nova solicitação de amizade'),
    recipientId: 'valid-recipient-id',
    ...override,
  });
}
