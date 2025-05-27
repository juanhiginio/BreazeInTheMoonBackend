import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

@Entity('reserva')
export class Reserva {
  @PrimaryGeneratedColumn()
  id_reserva: number;

  @Column()
  id_habitacion: number;

  @Column()
  id_hotel: number;

  @Column({ type: 'date' })
  fechaInicio: string;

  @Column({ type: 'date' })
  fechaFin: string;

  @Column({
    type: 'enum',
    enum: ['activa', 'cancelada', 'terminada', 'espera'],
  })
  estado: string;

  @Column({ type: 'date' })
  fechaReserva: string;

  @Column({ type: 'decimal', precision: 10, scale: 3 })
  precioTotal: number;

  @Column()
  id_usuario: number;

  @ManyToOne(() => Hotel)
  @JoinColumn({ name: 'id_hotel' })
  hotel: Hotel;

  @ManyToOne(() => Room)
  @JoinColumn({ name: 'id_habitacion' })
  habitacion: Room;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'id_usuario' })
  usuario: User;
}
