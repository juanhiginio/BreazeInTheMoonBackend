import { IsInt, IsString, IsOptional } from 'class-validator';

export class CreateRoomImageDto {
  @IsInt()
  roomId: number;

  @IsString()
  url_imagen: string;

  @IsOptional()
  @IsString()
  descripcion?: string;
}
