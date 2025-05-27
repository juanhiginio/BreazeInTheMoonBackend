import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Notificacion } from './notification.entity';
import { NotificacionService } from './notification.service';
import { NotificacionController } from './notification.controller';
import { User } from '../user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, User])],
  controllers: [NotificacionController],
  providers: [NotificacionService],
})
export class NotificacionModule {}
