import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { User } from '../user/user.entity';
import { Hotel } from '../hotel/hotel.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectRepository(Review)
    private readonly reviewRepository: Repository<Review>,

    @InjectRepository(User)
    private readonly usuarioRepository: Repository<User>,

    @InjectRepository(Hotel)
    private readonly hotelRepository: Repository<Hotel>,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const usuario = await this.usuarioRepository.findOne({
      where: { id_usuario: createReviewDto.usuarioId },
    });
    if (!usuario) {
      throw new NotFoundException('Usuario no encontrado');
    }
    const hotel = await this.hotelRepository.findOne({
      where: { id_hotel: createReviewDto.hotelId },
    });
    if (!hotel) {
      throw new NotFoundException('Hotel no encontrado');
    }

    const review = this.reviewRepository.create({
      usuario,
      hotel,
      calificacion: createReviewDto.calificacion,
      comentario: createReviewDto.comentario,
    });

    return this.reviewRepository.save(review);
  }

  async findAllByHotel(hotelId: number): Promise<Review[]> {
    return this.reviewRepository.find({
      where: { hotel: { id_hotel: hotelId } },
      relations: ['usuario'],
      order: { fecha: 'DESC' },
    });
  }

  async update(
    id_resena: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id_resena },
    });
    if (!review) {
      throw new NotFoundException('Reseña no encontrada');
    }
    Object.assign(review, updateReviewDto);
    return this.reviewRepository.save(review);
  }

  async remove(id_resena: number): Promise<void> {
    const result = await this.reviewRepository.delete(id_resena);
    if (result.affected === 0) {
      throw new NotFoundException('Reseña no encontrada');
    }
  }
}
