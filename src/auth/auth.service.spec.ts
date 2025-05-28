// auth.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from '../user/user.entity';

describe('AuthService', () => {
  let service: AuthService;
  let userService: Partial<Record<keyof UserService, jest.Mock>>;
  let jwtService: Partial<Record<keyof JwtService, jest.Mock>>;

  const mockUser: User = {
    id_usuario: 1,
    correo: 'test@example.com',
    contraseña: 'hashedPassword',
    nombre: 'Test',
    rol: 'cliente',
    notificaciones: [],
    reservas: [],
    resenas: [],
  };

  beforeEach(async () => {
    userService = {
      findByEmail: jest.fn(),
    };

    jwtService = {
      sign: jest.fn().mockReturnValue('mockedJwtToken'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  describe('validateUser', () => {
    it('should return user data without password if credentials are valid', async () => {
      userService.findByEmail?.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const result = await service.validateUser(
        'test@example.com',
        'validPassword',
      );
      expect(result).toEqual({
        id_usuario: 1,
        correo: 'test@example.com',
        nombre: 'Test',
        rol: 'cliente',
        notificaciones: [],
        reservas: [],
        resenas: [],
      });
    });

    it('should throw UnauthorizedException if user not found', async () => {
      userService.findByEmail?.mockResolvedValue(null);

      await expect(
        service.validateUser('nonexistent@example.com', 'anyPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw UnauthorizedException if password is invalid', async () => {
      userService.findByEmail?.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

      await expect(
        service.validateUser('test@example.com', 'wrongPassword'),
      ).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('login', () => {
    it('should return an access token', async () => {
      const user = { id_usuario: 1 };
      const result = await service.login(user);
      expect(result).toEqual({ access_token: 'mockedJwtToken' });
      expect(jwtService.sign).toHaveBeenCalledWith({ sub: 1 });
    });
  });
});
