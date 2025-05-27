import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HotelImage } from './hotelImage.entity';
import { CreateHotelImageDto } from './dto/create-hotel-image.dto';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class HotelImageService {
  constructor(
    @InjectRepository(HotelImage)
    private readonly hotelImageRepository: Repository<HotelImage>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createHotelImageDto: CreateHotelImageDto): Promise<HotelImage> {
    const hotel = await this.hotelRepository.findOne({
      where: { id_hotel: createHotelImageDto.hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }

    const imagen = this.hotelImageRepository.create({
      hotel,
      url_imagen: createHotelImageDto.url_imagen,
      descripcion: createHotelImageDto.descripcion,
    });

    return this.hotelImageRepository.save(imagen);
  }

  async findAllByHotel(hotelId: number): Promise<HotelImage[]> {
    return this.hotelImageRepository.find({
      where: { hotel: { id_hotel: hotelId } },
    });
  }

  async remove(id_imagen: number): Promise<void> {
    const result = await this.hotelImageRepository.delete(id_imagen);
    if (result.affected === 0) {
      throw new NotFoundException('Imagen no encontrada');
    }
  }
}
