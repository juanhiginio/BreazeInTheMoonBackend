import { Test, TestingModule } from '@nestjs/testing';
import { ReservaService } from './reservation.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Reserva } from './reservation.entity';
import { Repository } from 'typeorm';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

describe('ReservaService', () => {
  let service: ReservaService;
  let repo: Repository<Reserva>;

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
        ReservaService,
        {
          provide: getRepositoryToken(Reserva),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ReservaService>(ReservaService);
    repo = module.get<Repository<Reserva>>(getRepositoryToken(Reserva));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debe crear y guardar una nueva reserva', async () => {
      const dto: CreateReservaDto = {
        id_habitacion: 1,
        id_hotel: 1,
        fechaInicio: '2025-06-01',
        fechaFin: '2025-06-05',
        estado: 'activa',
        fechaReserva: '2025-05-27',
        precioTotal: 250.5,
        id_usuario: 10,
      };

      const createdEntity = { ...dto };

      mockRepository.create.mockReturnValue(createdEntity);
      mockRepository.save.mockResolvedValue(createdEntity);

      const result = await service.create(dto);

      expect(mockRepository.create).toHaveBeenCalledWith(dto);
      expect(mockRepository.save).toHaveBeenCalledWith(createdEntity);
      expect(result).toEqual(createdEntity);
    });
  });

  describe('findAll', () => {
    it('debe retornar todas las reservas con relaciones', async () => {
      const reservas = [
        {
          id_reserva: 1,
          id_habitacion: 1,
          id_hotel: 1,
          fechaInicio: '2025-06-01',
          fechaFin: '2025-06-05',
          estado: 'activa',
          fechaReserva: '2025-05-27',
          precioTotal: 250.5,
          id_usuario: 10,
          hotel: {},
          habitacion: {},
          usuario: {},
        },
      ];

      mockRepository.find.mockResolvedValue(reservas);

      const result = await service.findAll();

      expect(mockRepository.find).toHaveBeenCalledWith({
        relations: ['hotel', 'habitacion', 'usuario'],
      });
      expect(result).toEqual(reservas);
    });
  });

  describe('findOne', () => {
    it('debe retornar una reserva por id con relaciones', async () => {
      const id = 1;
      const reserva = {
        id_reserva: id,
        id_habitacion: 1,
        id_hotel: 1,
        fechaInicio: '2025-06-01',
        fechaFin: '2025-06-05',
        estado: 'activa',
        fechaReserva: '2025-05-27',
        precioTotal: 250.5,
        id_usuario: 10,
        hotel: {},
        habitacion: {},
        usuario: {},
      };

      mockRepository.findOne.mockResolvedValue(reserva);

      const result = await service.findOne(id);

      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id_reserva: id },
        relations: ['hotel', 'habitacion', 'usuario'],
      });
      expect(result).toEqual(reserva);
    });
  });

  describe('update', () => {
    it('debe actualizar una reserva', async () => {
      const id = 1;
      const dto: UpdateReservaDto = {
        estado: 'cancelada',
      };

      mockRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(id, dto);

      expect(mockRepository.update).toHaveBeenCalledWith(id, dto);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('remove', () => {
    it('debe eliminar una reserva por id', async () => {
      const id = 1;

      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(id);

      expect(mockRepository.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ affected: 1 });
    });
  });
});
