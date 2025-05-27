import { IsString, IsEmail, IsEnum, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @IsEmail()
  correo: string;

  @IsString()
  @MinLength(6)
  contraseña: string;

  @IsEnum(['administrador', 'cliente'])
  rol: 'administrador' | 'cliente';
}
