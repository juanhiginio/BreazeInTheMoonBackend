import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.contraseña, 10);
    const user = this.userRepository.create({
      ...createUserDto,
      contraseña: hashedPassword,
    });
    return this.userRepository.save(user);
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOne({ where: { id_usuario: id } });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    if (updateUserDto.contraseña) {
      updateUserDto.contraseña = await bcrypt.hash(
        updateUserDto.contraseña,
        10,
      );
    }
    return this.userRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  async findByEmail(correo: string) {
    return this.userRepository.findOne({ where: { correo } });
  }
}
