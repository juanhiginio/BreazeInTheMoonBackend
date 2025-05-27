import { IsInt, IsNumber, IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoomDto {
  @ApiProperty({
    example: 1,
    description: 'ID del hotel al que pertenece la habitación',
  })
  @IsInt()
  id_hotel: number;

  @ApiProperty({
    example: 150.5,
    description: 'Precio por noche de la habitación',
  })
  @IsNumber()
  precio: number;

  @ApiProperty({
    example: 3,
    description: 'Capacidad máxima de personas en la habitación',
  })
  @IsInt()
  capacidad: number;

  @ApiProperty({
    example: 'suite',
    description: 'Tipo o categoría de la habitación',
  })
  @IsString()
  tipo: string;

  @ApiProperty({
    example: true,
    description: 'Disponibilidad actual de la habitación',
  })
  @IsBoolean()
  disponibilidad: boolean;

  @ApiProperty({
    example: 'Habitación amplia con vista al mar',
    description: 'Descripción detallada de la habitación',
  })
  @IsString()
  descripcion: string;
}
