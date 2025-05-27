import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateHotelImageDto {
  @IsInt()
  hotelId: number;

  @IsString()
  url_imagen: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
