import { Module } from '@nestjs/common';
import { SendNotification } from '@application/use-cases/SendNotification';
import { NotificationsController } from './controllers/notifications.controller';
import { DatabaseModule } from '@infra/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [SendNotification],
})
export class HttpModule {}
