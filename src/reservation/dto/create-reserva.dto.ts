export class CreateReservaDto {
  id_habitacion: number;
  id_hotel: number;
  fechaInicio: string;
  fechaFin: string;
  estado: 'activa' | 'cancelada' | 'terminada' | 'espera';
  fechaReserva: string;
  precioTotal: number;
  id_usuario: number;
}
