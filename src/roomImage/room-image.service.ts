import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RoomImage } from './roomImage.entity';
import { CreateRoomImageDto } from './dto/create-room-image.dto';
import { Room } from '../room/room.entity';

@Injectable()
export class RoomImageService {
  constructor(
    @InjectRepository(RoomImage)
    private readonly roomImageRepository: Repository<RoomImage>,

    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
  ) {}

  async create(createRoomImageDto: CreateRoomImageDto): Promise<RoomImage> {
    const room = await this.roomRepository.findOne({
      where: { id_habitacion: createRoomImageDto.roomId },
    });
    if (!room) {
      throw new NotFoundException('Habitación no encontrada');
    }

    const image = this.roomImageRepository.create({
      room,
      url_imagen: createRoomImageDto.url_imagen,
      descripcion: createRoomImageDto.descripcion,
    });

    return this.roomImageRepository.save(image);
  }

  async findAllByRoom(roomId: number): Promise<RoomImage[]> {
    return this.roomImageRepository.find({
      where: { room: { id_habitacion: roomId } },
    });
  }

  async remove(id_imagen: number): Promise<void> {
    const result = await this.roomImageRepository.delete(id_imagen);
    if (result.affected === 0) {
      throw new NotFoundException('Imagen no encontrada');
    }
  }
}
