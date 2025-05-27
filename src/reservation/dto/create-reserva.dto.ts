import { ApiProperty } from '@nestjs/swagger';

export class CreateReservaDto {
  @ApiProperty({ example: 1, description: 'ID de la habitación reservada' })
  id_habitacion: number;

  @ApiProperty({
    example: 1,
    description: 'ID del hotel asociado a la reserva',
  })
  id_hotel: number;

  @ApiProperty({
    example: '2025-06-01',
    description: 'Fecha de inicio de la reserva',
  })
  fechaInicio: string;

  @ApiProperty({
    example: '2025-06-05',
    description: 'Fecha de fin de la reserva',
  })
  fechaFin: string;

  @ApiProperty({
    example: 'activa',
    description: 'Estado actual de la reserva',
    enum: ['activa', 'cancelada', 'terminada', 'espera'],
  })
  estado: 'activa' | 'cancelada' | 'terminada' | 'espera';

  @ApiProperty({
    example: '2025-05-27',
    description: 'Fecha en que se realizó la reserva',
  })
  fechaReserva: string;

  @ApiProperty({
    example: 250.5,
    description: 'Precio total calculado para la reserva',
  })
  precioTotal: number;

  @ApiProperty({
    example: 10,
    description: 'ID del usuario que realiza la reserva',
  })
  id_usuario: number;
}
