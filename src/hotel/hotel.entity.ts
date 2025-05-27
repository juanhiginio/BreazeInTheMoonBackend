import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from '../room/room.entity';
import { Review } from '../review/review.entity';
import { HotelImage } from '../hotelImage/hotelImage.entity';

@Entity('hotel')
export class Hotel {
  @PrimaryGeneratedColumn()
  id_hotel: number;

  @Column()
  nombre: string;

  @Column()
  direccion: string;

  @Column()
  ciudad: string;

  @Column()
  pais: string;

  @Column()
  descripcion: string;

  @OneToMany(() => Room, (room) => room.hotel)
  habitaciones: Room[];

  @OneToMany(() => Review, (review) => review.hotel)
  resenas: Review[];

  @OneToMany(() => HotelImage, (imagen) => imagen.hotel)
  imagenes: HotelImage[];
}
