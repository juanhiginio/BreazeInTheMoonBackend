import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './review.entity';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { User } from '../user/user.entity';
import { Hotel } from '../hotel/hotel.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Review, User, Hotel])],
  providers: [ReviewService],
  controllers: [ReviewController],
})
export class ReviewModule {}
