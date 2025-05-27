import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RoomModule } from './room/room.module';
import { HotelModule } from './hotel/hotel.module';
import { NotificacionModule } from './notification/notification.module';
import { ReservaModule } from './reservation/reservation.module';
import { ReviewModule } from './review/review.module';
import { UserModule } from './user/user.module';
import { HotelImageModule } from './hotelImage/hotel-image.module';
import { RoomImageModule } from './roomImage/room-image.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV === 'docker' ? '.env.docker' : '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306', 10),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'breazeinthemoonhotel',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RoomModule,
    HotelModule,
    NotificacionModule,
    ReservaModule,
    ReviewModule,
    UserModule,
    HotelImageModule,
    RoomImageModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
