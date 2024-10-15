import { Module } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from '../db/entities/farmer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farmer])],
  controllers: [FarmersController],
  providers: [FarmersService],
})
export class FarmersModule {}
