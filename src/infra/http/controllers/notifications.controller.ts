import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateNotification } from '../dtos/create-notification.dto';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@application/use-cases/CancelNotification';
import { CountRecipientNotifications } from '@application/use-cases/CountRecipientNotifications';
import { GetRecipientNotifications } from '@application/use-cases/GetRecipientNotifications';
import { ReadNotification } from '@application/use-cases/ReadNotification';
import { SendNotification } from '@application/use-cases/SendNotification';
import { UnreadNotification } from '@application/use-cases/UnreadNotification';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private cancelNotification: CancelNotification,
    private countRecipientNotifications: CountRecipientNotifications,
    private getRecipientNotifications: GetRecipientNotifications,
    private readNotification: ReadNotification,
    private sendNotification: SendNotification,
    private unreadNotification: UnreadNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/from/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotifications.execute({
      recipientId,
    });

    return {
      count,
    };
  }

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

  @Get('from/:recipientId')
  async getFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.getRecipientNotifications.execute({
      recipientId,
    });

    return {
      notifications: notifications.map(NotificationViewModel.toHTTP),
    };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }
}
