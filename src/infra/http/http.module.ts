import { Module } from '@nestjs/common';
import { SendNotification } from 'src/application/use-cases/SendNotification';
import { NotificationsController } from './controllers/notifications.controller';

@Module({
  imports: [],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
