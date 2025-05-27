import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(correo: string, contraseña: string): Promise<any> {
    const user = await this.usersService.findByEmail(correo);
    console.log('Usuario encontrado en login:', user);
    if (!user) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const passwordValid = await bcrypt.compare(contraseña, user.contraseña);
    if (!passwordValid) {
      throw new UnauthorizedException('Correo o contraseña incorrectos');
    }

    const { contraseña: _, ...result } = user;
    return result;
  }

  async login(user: any) {
    const payload = { sub: user.id_usuario };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
