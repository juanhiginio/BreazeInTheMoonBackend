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
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Imágenes de hoteles')
@Controller('hotel_image')
export class HotelImageController {
  constructor(private readonly hotelImageService: HotelImageService) {}

  @Post()
  @ApiOperation({ summary: 'Agregar una imagen a un hotel' })
  @ApiBody({
    type: CreateHotelImageDto,
    examples: {
      ejemplo1: {
        summary: 'Imagen principal del hotel',
        value: {
          hotelId: 1,
          url_imagen: 'https://miapp.com/imagenes/hotel1.jpg',
          descripcion: 'Fachada principal del hotel',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Imagen agregada exitosamente',
    schema: {
      example: {
        id: 1,
        hotelId: 1,
        url_imagen: 'https://miapp.com/imagenes/hotel1.jpg',
        descripcion: 'Fachada principal del hotel',
        createdAt: '2025-05-27T12:00:00.000Z',
        updatedAt: '2025-05-27T12:00:00.000Z',
      },
    },
  })
  create(@Body() createHotelImageDto: CreateHotelImageDto) {
    return this.hotelImageService.create(createHotelImageDto);
  }

  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Obtener todas las imágenes de un hotel por ID' })
  @ApiParam({ name: 'hotelId', type: Number, description: 'ID del hotel' })
  @ApiResponse({
    status: 200,
    description: 'Imágenes del hotel encontradas',
    schema: {
      example: [
        {
          id: 1,
          hotelId: 1,
          url_imagen: 'https://miapp.com/imagenes/hotel1.jpg',
          descripcion: 'Fachada principal del hotel',
          createdAt: '2025-05-27T12:00:00.000Z',
          updatedAt: '2025-05-27T12:00:00.000Z',
        },
        {
          id: 2,
          hotelId: 1,
          url_imagen: 'https://miapp.com/imagenes/piscina.jpg',
          descripcion: 'Área de piscina',
          createdAt: '2025-05-27T12:10:00.000Z',
          updatedAt: '2025-05-27T12:10:00.000Z',
        },
      ],
    },
  })
  findAllByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.hotelImageService.findAllByHotel(hotelId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una imagen por ID' })
  @ApiParam({
    name: 'id',
    type: Number,
    description: 'ID de la imagen a eliminar',
  })
  @ApiResponse({
    status: 200,
    description: 'Imagen eliminada correctamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Imagen no encontrada',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.hotelImageService.remove(id);
  }
}
