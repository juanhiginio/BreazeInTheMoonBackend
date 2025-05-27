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

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Imágenes de Habitaciones')
@Controller('room_image')
export class RoomImageController {
  constructor(private readonly roomImageService: RoomImageService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva imagen para una habitación' })
  @ApiBody({ type: CreateRoomImageDto })
  @ApiResponse({
    status: 201,
    description: 'Imagen creada correctamente',
    type: CreateRoomImageDto,
  })
  create(@Body() createRoomImageDto: CreateRoomImageDto) {
    return this.roomImageService.create(createRoomImageDto);
  }

  @Get('room/:roomId')
  @ApiOperation({ summary: 'Obtener todas las imágenes de una habitación' })
  @ApiParam({
    name: 'roomId',
    description: 'ID de la habitación',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de imágenes para la habitación',
  })
  findAllByRoom(@Param('roomId', ParseIntPipe) roomId: number) {
    return this.roomImageService.findAllByRoom(roomId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una imagen por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la imagen a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Imagen eliminada correctamente' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomImageService.remove(id);
  }
}
