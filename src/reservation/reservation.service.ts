import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reserva } from './reservation.entity';
import { CreateReservaDto } from './dto/create-reserva.dto';
import { UpdateReservaDto } from './dto/update-reserva.dto';

@Injectable()
export class ReservaService {
  constructor(
    @InjectRepository(Reserva)
    private reservaRepository: Repository<Reserva>,
  ) {}

  create(createReservaDto: CreateReservaDto) {
    const reserva = this.reservaRepository.create(createReservaDto);
    return this.reservaRepository.save(reserva);
  }

  findAll() {
    return this.reservaRepository.find({
      relations: ['hotel', 'habitacion', 'usuario'],
    });
  }

  findOne(id: number) {
    return this.reservaRepository.findOne({
      where: { id_reserva: id },
      relations: ['hotel', 'habitacion', 'usuario'],
    });
  }

  update(id: number, updateReservaDto: UpdateReservaDto) {
    return this.reservaRepository.update(id, updateReservaDto);
  }

  remove(id: number) {
    return this.reservaRepository.delete(id);
  }
}
