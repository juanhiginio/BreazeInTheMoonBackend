enum ReservationStatus {
  ACTIVA = 'ACTIVA',
  CANCELADA = 'CANCELADA',
  TERMINADA = 'TERMINADA',
  ESPERA = 'ESPERA',
}

export class Reserva {
  id_reserva: number;
  id_habitacion: number;
  id_hotel: number;
  fechaInicio: Date;
  fechaFin: Date;
  estado: ReservationStatus;
  fechaReserva: Date;
  precioTotal: number;
  id_usuario: number;
}
