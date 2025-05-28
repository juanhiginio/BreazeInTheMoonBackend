import { Test, TestingModule } from '@nestjs/testing';
import { NotificacionService } from './notification.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Notificacion } from './notification.entity';
import { Repository } from 'typeorm';

describe('NotificacionService', () => {
  let service: NotificacionService;
  let repo: Repository<Notificacion>;

  const mockRepository = {
    create: jest.fn(),
    save: jest.fn(),
    find: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        NotificacionService,
        {
          provide: getRepositoryToken(Notificacion),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<NotificacionService>(NotificacionService);
    repo = module.get<Repository<Notificacion>>(
      getRepositoryToken(Notificacion),
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear y guardar una nueva notificación', async () => {
      const dto = {
        id_remitente: 1,
        mensaje: 'Mensaje test',
        mensajeLeido: false,
        fechaEnvio: new Date(),
      };

      const createdEntity = {
        ...dto,
        remitente: { id_usuario: dto.id_remitente },
      };

      mockRepository.create.mockReturnValue(createdEntity);
      mockRepository.save.mockResolvedValue(createdEntity);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith({
        ...dto,
        remitente: { id_usuario: dto.id_remitente },
      });

      expect(mockRepository.save).toHaveBeenCalledWith(createdEntity);
      expect(result).toEqual(createdEntity);
    });
  });

  describe('findAll', () => {
    it('debe retornar todas las notificaciones con relaciones', async () => {
      const notifications = [
        { id_notificacion: 1, mensaje: 'Test', remitente: { id_usuario: 1 } },
      ];

      mockRepository.find.mockResolvedValue(notifications);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['remitente'],
      });
      expect(result).toEqual(notifications);
    });
  });

  describe('findOne', () => {
    it('debe retornar una notificación por id con relaciones', async () => {
      const id = 1;
      const notification = {
        id_notificacion: id,
        mensaje: 'Test',
        remitente: { id_usuario: 1 },
      };

      mockRepository.findOne.mockResolvedValue(notification);

      const result = await service.findOne(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_notificacion: id },
        relations: ['remitente'],
      });

      expect(result).toEqual(notification);
    });
  });

  describe('update', () => {
    it('debe actualizar una notificación con id_remitente presente', async () => {
      const id = 1;
      const dto = {
        mensaje: 'Mensaje actualizado',
        id_remitente: 2,
      };

      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(id, dto);

      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        ...dto,
        remitente: { id_usuario: dto.id_remitente },
      });

      expect(result).toEqual({ affected: 1 });
    });

    it('debe actualizar una notificación sin id_remitente', async () => {
      const id = 1;
      const dto = {
        mensaje: 'Mensaje actualizado',
      };

      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(id, dto);

      expect(mockRepository.update).toHaveBeenCalledWith(id, {
        ...dto,
        remitente: undefined,
      });

      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('debe eliminar una notificación por id', async () => {
      const id = 1;

      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
