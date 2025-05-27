import { IsInt, IsString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateRoomImageDto {
  @ApiProperty({
    example: 1,
    description: 'ID de la habitación a la que pertenece la imagen',
  })
  @IsInt()
  roomId: number;

  @ApiProperty({
    example: 'https://misitio.com/imagenes/habitacion1.jpg',
    description: 'URL de la imagen',
  })
  @IsString()
  url_imagen: string;

  @ApiPropertyOptional({
    example: 'Vista lateral de la habitación',
    description: 'Descripción opcional de la imagen',
  })
  @IsOptional()
  @IsString()
  descripcion?: string;
}
