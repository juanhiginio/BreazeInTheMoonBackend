import { Test, TestingModule } from '@nestjs/testing';
import { HotelService } from './hotel.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Hotel } from './hotel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

const mockHotel = {
  id_hotel: 1,
  nombre: 'Hotel Luna',
  direccion: 'Calle 123',
  ciudad: 'Ciudad Gótica',
  pais: 'Latveria',
  descripcion: 'Hotel misterioso',
};

describe('HotelService', () => {
  let service: HotelService;
  let repo: Repository<Hotel>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HotelService,
        {
          provide: getRepositoryToken(Hotel),
          useValue: {
            create: jest.fn().mockReturnValue(mockHotel),
            save: jest.fn().mockResolvedValue(mockHotel),
            find: jest.fn().mockResolvedValue([mockHotel]),
            findOne: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<HotelService>(HotelService);
    repo = module.get<Repository<Hotel>>(getRepositoryToken(Hotel));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create and return a hotel', async () => {
      const result = await service.create(mockHotel as any);
      expect(result).toEqual(mockHotel);
      expect(repo.create).toHaveBeenCalledWith(mockHotel);
      expect(repo.save).toHaveBeenCalledWith(mockHotel);
    });
  });

  describe('findAll', () => {
    it('should return an array of hotels', async () => {
      const result = await service.findAll();
      expect(result).toEqual([mockHotel]);
      expect(repo.find).toHaveBeenCalledWith({
        relations: ['imagenes', 'habitaciones'],
      });
    });
  });

  describe('findOne', () => {
    it('should return a hotel by id', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockHotel as any);
      const result = await service.findOne(1);
      expect(result).toEqual(mockHotel);
    });

    it('should return null if hotel not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);
      const result = await service.findOne(999);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update and return the hotel', async () => {
      const updatedHotel = { ...mockHotel, nombre: 'Hotel Sol' };
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(mockHotel as any);
      jest.spyOn(repo, 'save').mockResolvedValueOnce(updatedHotel as any);

      const result = await service.update(1, { nombre: 'Hotel Sol' });
      expect(result).toEqual(updatedHotel);
    });

    it('should throw NotFoundException if hotel not found', async () => {
      jest.spyOn(repo, 'findOne').mockResolvedValueOnce(null);

      await expect(service.update(999, { nombre: 'Fake' })).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should delete the hotel successfully', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 1 } as any);
      await expect(service.remove(1)).resolves.toBeUndefined();
    });

    it('should throw NotFoundException if hotel not found', async () => {
      jest.spyOn(repo, 'delete').mockResolvedValueOnce({ affected: 0 } as any);
      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
