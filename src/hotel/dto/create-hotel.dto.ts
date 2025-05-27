import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateHotelDto {
  @ApiProperty({ description: 'Nombre del hotel' })
  @IsString()
  nombre: string;

  @ApiProperty({ description: 'Dirección del hotel' })
  @IsString()
  direccion: string;

  @ApiProperty({ description: 'Ciudad donde se ubica el hotel' })
  @IsString()
  ciudad: string;

  @ApiProperty({ description: 'País donde se encuentra el hotel' })
  @IsString()
  pais: string;

  @ApiProperty({ description: 'Descripción general del hotel' })
  @IsString()
  descripcion: string;
}
