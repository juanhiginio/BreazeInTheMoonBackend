import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';

@ApiTags('Autenticación')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Inicio de sesión de usuario' })
  @ApiBody({
    type: LoginDto,
    examples: {
      ejemploLogin: {
        summary: 'Ejemplo de inicio de sesión',
        value: {
          correo: 'usuario@ejemplo.com',
          contraseña: 'mi_contraseña_segura',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Inicio de sesión exitoso. Retorna un token JWT.',
    schema: {
      example: {
        access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
      },
    },
  })
  @ApiResponse({
    status: 401,
    description: 'Correo o contraseña incorrectos.',
  })
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    try {
      const user = await this.authService.validateUser(
        loginDto.correo,
        loginDto.contraseña,
      );
      return this.authService.login(user);
    } catch (error) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }
  }
}
