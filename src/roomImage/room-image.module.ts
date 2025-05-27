import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomImage } from './roomImage.entity';
import { RoomImageService } from './room-image.service';
import { RoomImageController } from './room-image.controller';
import { Room } from '../room/room.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoomImage, Room])],
  providers: [RoomImageService],
  controllers: [RoomImageController],
})
export class RoomImageModule {}
