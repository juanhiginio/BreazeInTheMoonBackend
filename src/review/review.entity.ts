import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../user/user.entity';
import { Hotel } from '../hotel/hotel.entity';

@Entity('review')
export class Review {
  @PrimaryGeneratedColumn()
  id_resena: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.resenas, { onDelete: 'CASCADE' })
  hotel: Hotel;

  @ManyToOne(() => User, (usuario) => usuario.resenas, {
    onDelete: 'CASCADE',
  })
  usuario: User;

  @Column({ type: 'int', width: 1 })
  calificacion: number;

  @Column({ type: 'text', nullable: true })
  comentario: string;

  @CreateDateColumn()
  fecha: Date;
}
