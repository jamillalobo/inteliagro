import { forwardRef, Module } from '@nestjs/common';
import { PlantationService } from '../application/plantation.service';
import { PlantationController } from '../presenter/http/plantation.controller';
import { Plantation } from '../domain/entities/plantation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersModule } from 'src/application/farmers.module';
import { Farmer } from 'src/domain/entities/farmer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plantation, Farmer]),
    forwardRef(() => FarmersModule)
  ],
  providers: [PlantationService],
  controllers: [PlantationController],
})
export class PlantationModule {}
