import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Hotel } from './hotel.entity';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';

@Injectable()
export class HotelService {
  constructor(
    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  create(createHotelDto: CreateHotelDto): Promise<Hotel> {
    const hotel = this.hotelRepository.create(createHotelDto);
    return this.hotelRepository.save(hotel);
  }

  findAll(): Promise<Hotel[]> {
    return this.hotelRepository.find({
      relations: ['imagenes', 'habitaciones'],
    });
  }

  findOne(id: number): Promise<Hotel | null> {
    return this.hotelRepository.findOne({
      where: { id_hotel: id },
      relations: ['imagenes', 'habitaciones'],
    });
  }

  async update(
    id: number,
    updateHotelDto: UpdateHotelDto,
  ): Promise<Hotel | null> {
    const hotel = await this.hotelRepository.findOne({
      where: { id_hotel: id },
    });
    if (!hotel) throw new NotFoundException('Hotel no encontrado');
    Object.assign(hotel, updateHotelDto);
    return this.hotelRepository.save(hotel);
  }

  async remove(id: number): Promise<void> {
    const result = await this.hotelRepository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException('Hotel no encontrado');
  }
}
