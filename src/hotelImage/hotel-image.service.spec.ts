import { Test, TestingModule } from '@nestjs/testing';
import { HotelImageService } from './hotel-image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { HotelImage } from './hotelImage.entity';
import { Hotel } from '../hotel/hotel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockHotel = {
  id_hotel: 1,
  nombre: 'Hotel Test',
} as Hotel;

const mockImage = {
  id_imagen: 1,
  url_imagen: 'https://example.com/image.jpg',
  descripcion: 'Imagen principal',
  hotel: mockHotel,
} as HotelImage;

describe('HotelImageService', () => {
  let service: HotelImageService;
  let imageRepo: Repository<HotelImage>;
  let hotelRepo: Repository<Hotel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelImageService,
        {
          provide: getRepositoryToken(HotelImage),
          useValue: {
            create: jest.fn().mockReturnValue(mockImage),
            save: jest.fn().mockResolvedValue(mockImage),
            find: jest.fn().mockResolvedValue([mockImage]),
            delete: jest.fn(),
          },
        },
        {
          provide: getRepositoryToken(Hotel),
          useValue: {
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HotelImageService>(HotelImageService);
    imageRepo = module.get<Repository<HotelImage>>(
      getRepositoryToken(HotelImage),
    );
    hotelRepo = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return an image if hotel exists', async () => {
      const dto = {
        hotelId: 1,
        url_imagen: 'https://example.com/image.jpg',
        descripcion: 'Imagen principal',
      };

      jest.spyOn(hotelRepo, 'findOne').mockResolvedValueOnce(mockHotel);

      const result = await service.create(dto);
      expect(result).toEqual(mockImage);
      expect(imageRepo.create).toHaveBeenCalledWith({
        hotel: mockHotel,
        url_imagen: dto.url_imagen,
        descripcion: dto.descripcion,
      });
      expect(imageRepo.save).toHaveBeenCalledWith(mockImage);
    });

    it('should throw NotFoundException if hotel not found', async () => {
      jest.spyOn(hotelRepo, 'findOne').mockResolvedValueOnce(null);

      await expect(
        service.create({
          hotelId: 999,
          url_imagen: 'https://example.com/fake.jpg',
          descripcion: 'Fake',
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllByHotel', () => {
    it('should return all images for a hotel', async () => {
      const result = await service.findAllByHotel(1);
      expect(result).toEqual([mockImage]);
      expect(imageRepo.find).toHaveBeenCalledWith({
        where: { hotel: { id_hotel: 1 } },
      });
    });
  });

  describe('remove', () => {
    it('should delete the image if found', async () => {
      jest
        .spyOn(imageRepo, 'delete')
        .mockResolvedValueOnce({ affected: 1 } as any);

      await expect(service.remove(1)).resolves.toBeUndefined();
      expect(imageRepo.delete).toHaveBeenCalledWith(1);
    });

    it('should throw NotFoundException if image not found', async () => {
      jest
        .spyOn(imageRepo, 'delete')
        .mockResolvedValueOnce({ affected: 0 } as any);

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
