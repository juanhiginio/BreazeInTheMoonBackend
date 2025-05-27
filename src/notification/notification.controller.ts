import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { NotificacionService } from './notification.service';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Notificaciones')
@Controller('notificacion')
export class NotificacionController {
  constructor(private readonly service: NotificacionService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva notificación' })
  @ApiBody({ type: CreateNotificacionDto })
  @ApiResponse({
    status: 201,
    description: 'Notificación creada correctamente',
    type: CreateNotificacionDto,
  })
  create(@Body() dto: CreateNotificacionDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las notificaciones' })
  @ApiResponse({
    status: 200,
    description: 'Listado de notificaciones',
    type: [CreateNotificacionDto],
  })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una notificación por ID' })
  @ApiParam({ name: 'id', description: 'ID de la notificación', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Notificación encontrada',
    type: CreateNotificacionDto,
  })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una notificación existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la notificación a actualizar',
    type: Number,
  })
  @ApiBody({ type: UpdateNotificacionDto })
  @ApiResponse({
    status: 200,
    description: 'Notificación actualizada correctamente',
    type: UpdateNotificacionDto,
  })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  update(@Param('id') id: string, @Body() dto: UpdateNotificacionDto) {
    return this.service.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una notificación por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la notificación a eliminar',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Notificación eliminada correctamente',
  })
  @ApiResponse({ status: 404, description: 'Notificación no encontrada' })
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
