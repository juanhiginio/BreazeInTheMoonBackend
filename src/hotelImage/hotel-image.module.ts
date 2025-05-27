import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HotelImage } from './hotelImage.entity';
import { HotelImageService } from './hotel-image.service';
import { HotelImageController } from './hotel-image.controller';
import { Hotel } from '../hotel/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([HotelImage, Hotel])],
  providers: [HotelImageService],
  controllers: [HotelImageController],
})
export class HotelImageModule {}
