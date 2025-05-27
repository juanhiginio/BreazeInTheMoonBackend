import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Notificacion } from '../notification/notification.entity';
import { Reserva } from '../reservation/reservation.entity';
import { Review } from '../review/review.entity';

@Entity('usuario')
export class User {
  @PrimaryGeneratedColumn()
  id_usuario: number;

  @Column({ type: 'varchar', length: 25 })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  correo: string;

  @Column({ type: 'varchar', length: 255 })
  contraseña: string;

  @Column({ type: 'enum', enum: ['administrador', 'cliente'] })
  rol: 'administrador' | 'cliente';

  @OneToMany(() => Notificacion, (noti) => noti.remitente)
  notificaciones: Notificacion[];

  @OneToMany(() => Reserva, (reserva) => reserva.usuario)
  reservas: Reserva[];

  @OneToMany(() => Review, (resena) => resena.usuario)
  resenas: Review[];
}
