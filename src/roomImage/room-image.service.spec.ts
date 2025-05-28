import { Test, TestingModule } from '@nestjs/testing';
import { RoomImageService } from './room-image.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { RoomImage } from './roomImage.entity';
import { Room } from '../room/room.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateRoomImageDto } from './dto/create-room-image.dto';

describe('RoomImageService', () => {
  let service: RoomImageService;
  let roomImageRepo: Repository<RoomImage>;
  let roomRepo: Repository<Room>;

  const mockRoomImageRepo = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    delete: jest.fn(),
  };

  const mockRoomRepo = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RoomImageService,
        {
          provide: getRepositoryToken(RoomImage),
          useValue: mockRoomImageRepo,
        },
        {
          provide: getRepositoryToken(Room),
          useValue: mockRoomRepo,
        },
      ],
    }).compile();

    service = module.get<RoomImageService>(RoomImageService);
    roomImageRepo = module.get<Repository<RoomImage>>(
      getRepositoryToken(RoomImage),
    );
    roomRepo = module.get<Repository<Room>>(getRepositoryToken(Room));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear y guardar una imagen de habitación', async () => {
      const dto: CreateRoomImageDto = {
        roomId: 1,
        url_imagen: 'https://img.com/habitacion1.jpg',
        descripcion: 'Imagen 1',
      };

      const mockRoom = { id_habitacion: 1 } as Room;
      const mockImage = { id_imagen: 1, ...dto, room: mockRoom } as RoomImage;

      mockRoomRepo.findOne.mockResolvedValue(mockRoom);
      mockRoomImageRepo.create.mockReturnValue(mockImage);
      mockRoomImageRepo.save.mockResolvedValue(mockImage);

      const result = await service.create(dto);
      expect(result).toEqual(mockImage);
      expect(mockRoomRepo.findOne).toHaveBeenCalledWith({
        where: { id_habitacion: dto.roomId },
      });
      expect(mockRoomImageRepo.create).toHaveBeenCalledWith({
        room: mockRoom,
        url_imagen: dto.url_imagen,
        descripcion: dto.descripcion,
      });
      expect(mockRoomImageRepo.save).toHaveBeenCalledWith(mockImage);
    });

    it('debería lanzar NotFoundException si la habitación no existe', async () => {
      mockRoomRepo.findOne.mockResolvedValue(null);

      await expect(
        service.create({ roomId: 1, url_imagen: '', descripcion: '' }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAllByRoom', () => {
    it('debería devolver todas las imágenes de una habitación', async () => {
      const mockImages = [
        {
          id_imagen: 1,
          url_imagen: 'url1',
          descripcion: '',
          room: { id_habitacion: 1 },
        } as RoomImage,
      ];

      mockRoomImageRepo.find.mockResolvedValue(mockImages);

      const result = await service.findAllByRoom(1);
      expect(result).toEqual(mockImages);
      expect(mockRoomImageRepo.find).toHaveBeenCalledWith({
        where: { room: { id_habitacion: 1 } },
      });
    });
  });

  describe('remove', () => {
    it('debería eliminar una imagen existente', async () => {
      mockRoomImageRepo.delete.mockResolvedValue({ affected: 1 });

      await service.remove(1);
      expect(mockRoomImageRepo.delete).toHaveBeenCalledWith(1);
    });

    it('debería lanzar NotFoundException si la imagen no existe', async () => {
      mockRoomImageRepo.delete.mockResolvedValue({ affected: 0 });

      await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });
  });
});
