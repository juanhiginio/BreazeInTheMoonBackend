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
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Hoteles')
@Controller('hotel')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo hotel' })
  @ApiBody({
    type: CreateHotelDto,
    examples: {
      ejemplo1: {
        summary: 'Hotel típico',
        value: {
          nombre: 'Hotel Luna Azul',
          direccion: 'Calle 123',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          descripcion: 'Un lugar acogedor para descansar bajo la luna.',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Hotel creado correctamente.',
    schema: {
      example: {
        id: 1,
        nombre: 'Hotel Luna Azul',
        direccion: 'Calle 123',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        descripcion: 'Un lugar acogedor para descansar bajo la luna.',
        createdAt: '2025-05-26T18:00:00.000Z',
        updatedAt: '2025-05-26T18:00:00.000Z',
      },
    },
  })
  create(@Body() dto: CreateHotelDto) {
    return this.hotelService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todos los hoteles' })
  @ApiResponse({
    status: 200,
    description: 'Lista de hoteles obtenida con éxito.',
    schema: {
      example: [
        {
          id: 1,
          nombre: 'Hotel Luna Azul',
          direccion: 'Calle 123',
          ciudad: 'Bogotá',
          pais: 'Colombia',
          descripcion: 'Un lugar acogedor para descansar bajo la luna.',
          createdAt: '2025-05-26T18:00:00.000Z',
          updatedAt: '2025-05-26T18:00:00.000Z',
        },
      ],
    },
  })
  findAll() {
    return this.hotelService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un hotel por ID' })
  @ApiResponse({
    status: 200,
    description: 'Hotel encontrado.',
    schema: {
      example: {
        id: 1,
        nombre: 'Hotel Luna Azul',
        direccion: 'Calle 123',
        ciudad: 'Bogotá',
        pais: 'Colombia',
        descripcion: 'Un lugar acogedor para descansar bajo la luna.',
        createdAt: '2025-05-26T18:00:00.000Z',
        updatedAt: '2025-05-26T18:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado.' })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un hotel por ID' })
  @ApiBody({
    type: UpdateHotelDto,
    examples: {
      ejemploActualizacion: {
        summary: 'Actualizar solo el nombre y la ciudad',
        value: {
          nombre: 'Hotel Sol Dorado',
          ciudad: 'Medellín',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Hotel actualizado correctamente.',
    schema: {
      example: {
        id: 1,
        nombre: 'Hotel Sol Dorado',
        direccion: 'Calle 123',
        ciudad: 'Medellín',
        pais: 'Colombia',
        descripcion: 'Un lugar acogedor para descansar bajo la luna.',
        createdAt: '2025-05-26T18:00:00.000Z',
        updatedAt: '2025-05-27T10:00:00.000Z',
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado.' })
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateHotelDto) {
    return this.hotelService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un hotel por ID' })
  @ApiResponse({ status: 200, description: 'Hotel eliminado correctamente.' })
  @ApiResponse({ status: 404, description: 'Hotel no encontrado.' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hotelService.remove(id);
  }
}
