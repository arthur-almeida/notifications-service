import { Body, Controller, Post } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/SendNotification';
import { CreateNotification } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(private sendNotification: SendNotification) {}

  @Post()
  async create(@Body() body: CreateNotification) {
    const { category, content, recipientId } = body;

    const { notification } = await this.sendNotification.execute({
      category,
      content,
      recipientId,
    });

    return NotificationViewModel.toHTTP(notification);
  }
}
