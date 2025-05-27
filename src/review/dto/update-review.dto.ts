import { IsOptional, IsInt, Min, Max, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateReviewDto {
  @ApiPropertyOptional({
    example: 5,
    description: 'Calificación actualizada del 1 al 5',
    minimum: 1,
    maximum: 5,
  })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  calificacion?: number;

  @ApiPropertyOptional({
    example: 'Comentario actualizado sobre la experiencia',
    description: 'Comentario actualizado opcional',
  })
  @IsOptional()
  @IsString()
  comentario?: string;
}
