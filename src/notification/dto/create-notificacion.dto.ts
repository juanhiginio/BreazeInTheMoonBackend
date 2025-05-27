import { IsInt, IsString, IsDateString, IsBoolean } from 'class-validator';

export class CreateNotificacionDto {
  @IsInt()
  id_remitente: number;

  @IsString()
  mensaje: string;

  @IsBoolean()
  mensajeLeido: boolean;

  @IsDateString()
  fechaEnvio: Date;
}
