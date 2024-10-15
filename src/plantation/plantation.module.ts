import { Module } from '@nestjs/common';
import { PlantationService } from './plantation.service';
import { PlantationController } from './plantation.controller';
import { Plantation } from '../db/entities/plantation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Plantation])],
  providers: [PlantationService],
  controllers: [PlantationController],
})
export class PlantationModule {}
