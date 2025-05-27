import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class RoomService {
  constructor(
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(dto: CreateRoomDto): Promise<Room> {
    const hotel = await this.hotelRepository.findOne({
      where: { id_hotel: dto.id_hotel },
    });
    if (!hotel) throw new NotFoundException('Hotel no encontrado');

    const room = this.roomRepository.create({ ...dto, hotel });
    return this.roomRepository.save(room);
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find({ relations: ['hotel', 'imagenes'] });
  }

  findOne(id: number): Promise<Room | null> {
    return this.roomRepository.findOne({
      where: { id_habitacion: id },
      relations: ['hotel', 'imagenes'],
    });
  }

  async update(id: number, dto: UpdateRoomDto): Promise<Room> {
    const room = await this.roomRepository.findOne({
      where: { id_habitacion: id },
    });
    if (!room) throw new NotFoundException('Habitación no encontrada');
    Object.assign(room, dto);
    return this.roomRepository.save(room);
  }

  async remove(id: number): Promise<void> {
    const result = await this.roomRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Habitación no encontrada');
  }
}
