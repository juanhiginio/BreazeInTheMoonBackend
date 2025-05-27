import { IsString } from 'class-validator';

export class CreateHotelDto {
  @IsString()
  nombre: string;

  @IsString()
  direccion: string;

  @IsString()
  ciudad: string;

  @IsString()
  pais: string;

  @IsString()
  descripcion: string;
}
