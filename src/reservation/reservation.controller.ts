import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReservaService } from './reservation.service';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Reservas')
@Controller('reserva')
export class ReservaController {
  constructor(private readonly reservaService: ReservaService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reserva' })
  @ApiBody({ type: CreateReservaDto })
  @ApiResponse({
    status: 201,
    description: 'Reserva creada correctamente',
    type: CreateReservaDto,
  })
  create(@Body() createReservaDto: CreateReservaDto) {
    return this.reservaService.create(createReservaDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas' })
  @ApiResponse({
    status: 200,
    description: 'Listado de reservas',
    type: [CreateReservaDto],
  })
  findAll() {
    return this.reservaService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva por ID' })
  @ApiParam({ name: 'id', description: 'ID de la reserva', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Reserva encontrada',
    type: CreateReservaDto,
  })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  findOne(@Param('id') id: string) {
    return this.reservaService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reserva existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reserva a actualizar',
    type: Number,
  })
  @ApiBody({ type: UpdateReservaDto })
  @ApiResponse({
    status: 200,
    description: 'Reserva actualizada correctamente',
    type: UpdateReservaDto,
  })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  update(@Param('id') id: string, @Body() updateReservaDto: UpdateReservaDto) {
    return this.reservaService.update(+id, updateReservaDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reserva a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Reserva eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Reserva no encontrada' })
  remove(@Param('id') id: string) {
    return this.reservaService.remove(+id);
  }
}
