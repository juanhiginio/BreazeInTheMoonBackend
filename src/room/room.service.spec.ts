import { Test, TestingModule } from '@nestjs/testing';
import { RoomService } from './room.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Room } from './room.entity';
import { Hotel } from '../hotel/hotel.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

describe('RoomService', () => {
  let service: RoomService;
  let roomRepository: Repository<Room>;
  let hotelRepository: Repository<Hotel>;

  const mockRoomRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    delete: jest.fn(),
  };

  const mockHotelRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomService,
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomRepo,
        },
        {
          provide: getRepositoryToken(Hotel),
          useValue: mockHotelRepo,
        },
      ],
    }).compile();

    service = module.get<RoomService>(RoomService);
    roomRepository = module.get(getRepositoryToken(Room));
    hotelRepository = module.get(getRepositoryToken(Hotel));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear una habitación si el hotel existe', async () => {
      const dto: CreateRoomDto = {
        id_hotel: 1,
        precio: 120,
        capacidad: 2,
        tipo: 'doble',
        disponibilidad: true,
        descripcion: 'Cómoda',
      };
      const hotel = { id_hotel: 1 } as Hotel;
      const room = mockRoomRepo.create({ ...dto, hotel });

      mockHotelRepo.findOne.mockResolvedValue(hotel);
      mockRoomRepo.create.mockReturnValue(room);
      mockRoomRepo.save.mockResolvedValue(room);

      const result = await service.create(dto);

      expect(result).toEqual(room);
      expect(mockHotelRepo.findOne).toHaveBeenCalledWith({
        where: { id_hotel: 1 },
      });
      expect(mockRoomRepo.create).toHaveBeenCalledWith({ ...dto, hotel });
      expect(mockRoomRepo.save).toHaveBeenCalledWith(room);
    });

    it('debería lanzar NotFoundException si el hotel no existe', async () => {
      mockHotelRepo.findOne.mockResolvedValue(null);

      await expect(service.create({} as CreateRoomDto)).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findAll', () => {
    it('debería retornar todas las habitaciones con sus relaciones', async () => {
      const rooms = [{ id_habitacion: 1 }] as Room[];
      mockRoomRepo.find.mockResolvedValue(rooms);

      const result = await service.findAll();
      expect(result).toEqual(rooms);
      expect(mockRoomRepo.find).toHaveBeenCalledWith({
        relations: ['hotel', 'imagenes'],
      });
    });
  });

  describe('findOne', () => {
    it('debería retornar una habitación si existe', async () => {
      const room = { id_habitacion: 1 } as Room;
      mockRoomRepo.findOne.mockResolvedValue(room);

      const result = await service.findOne(1);
      expect(result).toEqual(room);
      expect(mockRoomRepo.findOne).toHaveBeenCalledWith({
        where: { id_habitacion: 1 },
        relations: ['hotel', 'imagenes'],
      });
    });

    it('debería retornar null si no existe', async () => {
      mockRoomRepo.findOne.mockResolvedValue(null);

      const result = await service.findOne(1);
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('debería actualizar una habitación si existe', async () => {
      const room = { id_habitacion: 1, descripcion: 'vieja' } as Room;
      const dto: UpdateRoomDto = { descripcion: 'nueva' };

      mockRoomRepo.findOne.mockResolvedValue(room);
      mockRoomRepo.save.mockResolvedValue({ ...room, ...dto });

      const result = await service.update(1, dto);
      expect(result.descripcion).toBe('nueva');
      expect(mockRoomRepo.save).toHaveBeenCalledWith({ ...room, ...dto });
    });

    it('debería lanzar NotFoundException si la habitación no existe', async () => {
      mockRoomRepo.findOne.mockResolvedValue(null);

      await expect(service.update(1, {})).rejects.toThrow(NotFoundException);
    });
  });

  describe('remove', () => {
    it('debería eliminar la habitación si existe', async () => {
      mockRoomRepo.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRoomRepo.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si no existe la habitación', async () => {
      mockRoomRepo.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(1)).rejects.toThrow(NotFoundException);
    });
  });
});
