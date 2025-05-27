import { IsInt, IsString, IsDateString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNotificacionDto {
  @ApiProperty({
    example: 1,
    description: 'ID del remitente que envía la notificación',
  })
  @IsInt()
  id_remitente: number;

  @ApiProperty({
    example: 'Tienes un nuevo mensaje',
    description: 'Contenido del mensaje de la notificación',
  })
  @IsString()
  mensaje: string;

  @ApiProperty({
    example: false,
    description: 'Estado si el mensaje ha sido leído o no',
  })
  @IsBoolean()
  mensajeLeido: boolean;

  @ApiProperty({
    example: '2025-05-27T10:00:00Z',
    description: 'Fecha y hora del envío de la notificación',
  })
  @IsDateString()
  fechaEnvio: Date;
}
