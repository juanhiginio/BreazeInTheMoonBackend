import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from '../room/room.entity';

@Entity('room_image')
export class RoomImage {
  @PrimaryGeneratedColumn()
  id_imagen: number;

  @ManyToOne(() => Room, (room) => room.imagenes, { onDelete: 'CASCADE' })
  room: Room;

  @Column()
  url_imagen: string;

  @Column({ nullable: true })
  descripcion: string;
}
