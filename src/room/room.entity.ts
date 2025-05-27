import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';
import { RoomImage } from '../roomImage/roomImage.entity';

@Entity('habitacion')
export class Room {
  @PrimaryGeneratedColumn()
  id_habitacion: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.habitaciones, {
    onDelete: 'CASCADE',
  })
  hotel: Hotel;

  @Column('decimal')
  precio: number;

  @Column('int')
  capacidad: number;

  @Column()
  tipo: string;

  @Column()
  disponibilidad: boolean;

  @Column('text')
  descripcion: string;

  @OneToMany(() => RoomImage, (imagen) => imagen.room)
  imagenes: RoomImage[];
}
