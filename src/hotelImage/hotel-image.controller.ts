import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { HotelImageService } from './hotel-image.service';
import { CreateHotelImageDto } from './dto/create-hotel-image.dto';

@Controller('hotel_image')
export class HotelImageController {
  constructor(private readonly hotelImageService: HotelImageService) {}

  @Post()
  create(@Body() createHotelImageDto: CreateHotelImageDto) {
    return this.hotelImageService.create(createHotelImageDto);
  }

  @Get('hotel/:hotelId')
  findAllByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.hotelImageService.findAllByHotel(hotelId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hotelImageService.remove(id);
  }
}
