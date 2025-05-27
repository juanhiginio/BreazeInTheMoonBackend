import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './notification.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepository: Repository<Notificacion>,
  ) {}

  create(dto: CreateNotificacionDto) {
    const nueva = this.notificacionRepository.create({
      ...dto,
      remitente: { id_usuario: dto.id_remitente }, // relación
    });
    return this.notificacionRepository.save(nueva);
  }

  findAll() {
    return this.notificacionRepository.find({ relations: ['remitente'] });
  }

  findOne(id: number) {
    return this.notificacionRepository.findOne({
      where: { id_notificacion: id },
      relations: ['remitente'],
    });
  }

  update(id: number, dto: UpdateNotificacionDto) {
    return this.notificacionRepository.update(id, {
      ...dto,
      remitente: dto.id_remitente
        ? { id_usuario: dto.id_remitente }
        : undefined,
    });
  }

  remove(id: number) {
    return this.notificacionRepository.delete(id);
  }
}
