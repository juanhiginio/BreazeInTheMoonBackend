import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomImageService } from './room-image.service';
import { CreateRoomImageDto } from './dto/create-room-image.dto';

@Controller('room_image')
export class RoomImageController {
  constructor(private readonly roomImageService: RoomImageService) {}

  @Post()
  create(@Body() createRoomImageDto: CreateRoomImageDto) {
    return this.roomImageService.create(createRoomImageDto);
  }

  @Get('room/:roomId')
  findAllByRoom(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.roomImageService.findAllByRoom(roomId);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomImageService.remove(id);
  }
}
