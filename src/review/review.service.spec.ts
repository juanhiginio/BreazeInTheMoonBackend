import { Test, TestingModule } from '@nestjs/testing';
import { ReviewService } from './review.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { User } from '../user/user.entity';
import { Hotel } from '../hotel/hotel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

describe('ReviewService', () => {
  let service: ReviewService;
  let reviewRepository: Repository<Review>;
  let userRepository: Repository<User>;
  let hotelRepository: Repository<Hotel>;

  const mockReviewRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockUserRepository = {
    findOne: jest.fn(),
  };

  const mockHotelRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewService,
        {
          provide: getRepositoryToken(Review),
          useValue: mockReviewRepository,
        },
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(Hotel),
          useValue: mockHotelRepository,
        },
      ],
    }).compile();

    service = module.get<ReviewService>(ReviewService);
    reviewRepository = module.get<Repository<Review>>(
      getRepositoryToken(Review),
    );
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    hotelRepository = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('crea y retorna una reseña', async () => {
      const dto = {
        usuarioId: 1,
        hotelId: 1,
        calificacion: 5,
        comentario: 'Excelente',
        fecha: new Date(),
      };

      const usuario = { id_usuario: 1 } as User;
      const hotel = { id_hotel: 1 } as Hotel;
      const review = { id_resena: 1, ...dto, usuario, hotel } as Review;

      mockUserRepository.findOne.mockResolvedValue(usuario);
      mockHotelRepository.findOne.mockResolvedValue(hotel);
      mockReviewRepository.create.mockReturnValue(review);
      mockReviewRepository.save.mockResolvedValue(review);

      const result = await service.create(dto);
      expect(result).toEqual(review);
      expect(mockReviewRepository.create).toHaveBeenCalledWith({
        usuario,
        hotel,
        calificacion: dto.calificacion,
        comentario: dto.comentario,
      });
    });

    it('lanza error si no se encuentra el usuario', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(
        service.create({
          usuarioId: 999,
          hotelId: 1,
          calificacion: 4,
          comentario: 'Bueno',
        }),
      ).rejects.toThrow(NotFoundException);
    });

    it('lanza error si no se encuentra el hotel', async () => {
      mockUserRepository.findOne.mockResolvedValue({ id_usuario: 1 });
      mockHotelRepository.findOne.mockResolvedValue(null);
      await expect(
        service.create({
          usuarioId: 1,
          hotelId: 999,
          calificacion: 4,
          comentario: 'Bueno',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllByHotel', () => {
    it('retorna todas las reseñas del hotel', async () => {
      const reviews = [
        { id_resena: 1, comentario: 'Genial', calificacion: 5 } as Review,
        { id_resena: 2, comentario: 'Regular', calificacion: 3 } as Review,
      ];
      mockReviewRepository.find.mockResolvedValue(reviews);

      const result = await service.findAllByHotel(1);
      expect(result).toEqual(reviews);
      expect(mockReviewRepository.find).toHaveBeenCalledWith({
        where: { hotel: { id_hotel: 1 } },
        relations: ['usuario'],
        order: { fecha: 'DESC' },
      });
    });
  });

  describe('update', () => {
    it('actualiza y retorna la reseña', async () => {
      const review = {
        id_resena: 1,
        calificacion: 3,
        comentario: 'ok',
      } as Review;
      const updateDto = { calificacion: 5, comentario: 'Mejorado' };

      mockReviewRepository.findOne.mockResolvedValue(review);
      mockReviewRepository.save.mockResolvedValue({
        ...review,
        ...updateDto,
      });

      const result = await service.update(1, updateDto);
      expect(result.calificacion).toBe(5);
      expect(result.comentario).toBe('Mejorado');
    });

    it('lanza error si la reseña no existe', async () => {
      mockReviewRepository.findOne.mockResolvedValue(null);
      await expect(service.update(99, { calificacion: 4 })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('elimina una reseña', async () => {
      mockReviewRepository.delete.mockResolvedValue({ affected: 1 });
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('lanza error si la reseña no existe', async () => {
      mockReviewRepository.delete.mockResolvedValue({ affected: 0 });
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
