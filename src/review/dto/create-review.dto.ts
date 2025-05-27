import {
  IsNotEmpty,
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateReviewDto {
  @ApiProperty({
    example: 1,
    description: 'ID del hotel que se está evaluando',
  })
  @IsInt()
  hotelId: number;

  @ApiProperty({
    example: 5,
    description: 'ID del usuario que realiza la reseña',
  })
  @IsInt()
  usuarioId: number;

  @ApiProperty({
    example: 4,
    description: 'Calificación del hotel del 1 al 5',
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion: number;

  @ApiPropertyOptional({
    example: 'Muy buena experiencia, repetiría sin duda',
    description: 'Comentario opcional sobre la experiencia',
  })
  @IsOptional()
  @IsString()
  comentario?: string;
}
