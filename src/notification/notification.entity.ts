import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('notificacion')
export class Notificacion {
  @PrimaryGeneratedColumn()
  id_notificacion: number;

  @ManyToOne(() => User, (user) => user.notificaciones, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'id_remitente' })
  remitente: User;

  @Column({ type: 'varchar', length: 350 })
  mensaje: string;

  @Column({ type: 'tinyint', width: 1, default: 0 })
  mensajeLeido: boolean;

  @Column({ type: 'date' })
  fechaEnvio: Date;
}
