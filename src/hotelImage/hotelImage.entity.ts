import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Hotel } from '../hotel/hotel.entity';

@Entity('hotel_image')
export class HotelImage {
  @PrimaryGeneratedColumn()
  id_imagen: number;

  @ManyToOne(() => Hotel, (hotel) => hotel.imagenes, { onDelete: 'CASCADE' })
  hotel: Hotel;

  @Column()
  url_imagen: string;

  @Column({ nullable: true })
  descripcion: string;
}
