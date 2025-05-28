import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repo: Repository<User>;

  const mockUserRepository = {
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
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repo = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('debería crear un usuario con contraseña encriptada', async () => {
      const dto: CreateUserDto = {
        nombre: 'Juan',
        correo: 'juan@example.com',
        contraseña: '123456',
        rol: 'cliente',
      };

      const hashedPassword = await bcrypt.hash(dto.contraseña, 10);

      const createdUser = {
        ...dto,
        contraseña: hashedPassword,
      } as User;

      mockUserRepository.create.mockReturnValue(createdUser);
      mockUserRepository.save.mockResolvedValue(createdUser);

      const result = await service.create(dto);

      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...dto,
        contraseña: expect.any(String),
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result.contraseña).not.toBe(dto.contraseña);
    });
  });

  describe('findAll', () => {
    it('debería devolver todos los usuarios', async () => {
      const users = [{ id_usuario: 1 }, { id_usuario: 2 }] as User[];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('debería devolver un usuario por id', async () => {
      const user = { id_usuario: 1, nombre: 'Ana' } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOne(1);
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id_usuario: 1 },
      });
    });
  });

  describe('update', () => {
    it('debería actualizar un usuario sin nueva contraseña', async () => {
      const dto: UpdateUserDto = {
        nombre: 'Nuevo Nombre',
      };
      mockUserRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.update(1, dto);
      expect(mockUserRepository.update).toHaveBeenCalledWith(1, dto);
      expect(result).toEqual({ affected: 1 });
    });

    it('debería actualizar un usuario con nueva contraseña encriptada', async () => {
      const dto: UpdateUserDto = {
        contraseña: 'nueva123',
      };

      const resultMock = { affected: 1 };
      mockUserRepository.update.mockResolvedValue(resultMock);

      const result = await service.update(1, dto);
      expect(mockUserRepository.update).toHaveBeenCalledWith(1, {
        contraseña: expect.any(String),
      });
      expect(result).toEqual(resultMock);
    });
  });

  describe('remove', () => {
    it('debería eliminar un usuario por id', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove(1);
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
      expect(result).toEqual({ affected: 1 });
    });
  });

  describe('findByEmail', () => {
    it('debería devolver un usuario por correo', async () => {
      const user = { id_usuario: 1, correo: 'juan@example.com' } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findByEmail('juan@example.com');
      expect(result).toEqual(user);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { correo: 'juan@example.com' },
      });
    });
  });
});
