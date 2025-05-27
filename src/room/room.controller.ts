import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Habitaciones')
@Controller('habitacion')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva habitación' })
  @ApiBody({ type: CreateRoomDto })
  @ApiResponse({
    status: 201,
    description: 'Habitación creada correctamente',
    type: CreateRoomDto,
  })
  create(@Body() dto: CreateRoomDto) {
    return this.roomService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las habitaciones' })
  @ApiResponse({
    status: 200,
    description: 'Listado de habitaciones',
    type: [CreateRoomDto],
  })
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una habitación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la habitación', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Habitación encontrada',
    type: CreateRoomDto,
  })
  @ApiResponse({ status: 404, description: 'Habitación no encontrada' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una habitación existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la habitación a actualizar',
    type: Number,
  })
  @ApiBody({ type: UpdateRoomDto })
  @ApiResponse({
    status: 200,
    description: 'Habitación actualizada correctamente',
    type: UpdateRoomDto,
  })
  @ApiResponse({ status: 404, description: 'Habitación no encontrada' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateRoomDto) {
    return this.roomService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una habitación por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la habitación a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Habitación eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Habitación no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.roomService.remove(id);
  }
}
