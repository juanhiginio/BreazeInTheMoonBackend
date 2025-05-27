import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservaService } from './reservation.service';
import { ReservaController } from './reservation.controller';
import { Reserva } from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reserva])],
  controllers: [ReservaController],
  providers: [ReservaService],
})
export class ReservaModule {}
