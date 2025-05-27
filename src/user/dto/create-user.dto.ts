import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre completo del usuario',
  })
  @IsString()
  nombre: string;

  @ApiProperty({
    example: 'juan@example.com',
    description: 'Correo electrónico del usuario',
  })
  @IsEmail()
  correo: string;

  @ApiProperty({
    example: 'password123',
    description: 'Contraseña del usuario (mínimo 6 caracteres)',
  })
  @IsString()
  @MinLength(6)
  contraseña: string;

  @ApiProperty({
    example: 'cliente',
    enum: ['administrador', 'cliente'],
    description: 'Rol del usuario',
  })
  @IsEnum(['administrador', 'cliente'])
  rol: 'administrador' | 'cliente';
}
