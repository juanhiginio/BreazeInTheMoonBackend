import { IsInt, IsNumber, IsBoolean, IsString } from 'class-validator';

export class CreateRoomDto {
  @IsInt()
  id_hotel: number;

  @IsNumber()
  precio: number;

  @IsInt()
  capacidad: number;

  @IsString()
  tipo: string;

  @IsBoolean()
  disponibilidad: boolean;

  @IsString()
  descripcion: string;
}
