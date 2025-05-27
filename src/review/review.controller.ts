import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Param,
  Body,
  ParseIntPipe,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Reseñas')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva reseña para un hotel' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({
    status: 201,
    description: 'Reseña creada correctamente',
    type: CreateReviewDto,
  })
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get('hotel/:hotelId')
  @ApiOperation({ summary: 'Obtener todas las reseñas de un hotel específico' })
  @ApiParam({
    name: 'hotelId',
    description: 'ID del hotel para filtrar reseñas',
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Lista de reseñas para el hotel',
    type: [CreateReviewDto],
  })
  findAllByHotel(@Param('hotelId', ParseIntPipe) hotelId: number) {
    return this.reviewService.findAllByHotel(hotelId);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una reseña existente' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reseña a actualizar',
    type: Number,
  })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({
    status: 200,
    description: 'Reseña actualizada correctamente',
    type: UpdateReviewDto,
  })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReviewDto: UpdateReviewDto,
  ) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reseña por ID' })
  @ApiParam({
    name: 'id',
    description: 'ID de la reseña a eliminar',
    type: Number,
  })
  @ApiResponse({ status: 200, description: 'Reseña eliminada correctamente' })
  @ApiResponse({ status: 404, description: 'Reseña no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reviewService.remove(id);
  }
}
