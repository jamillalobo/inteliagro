import { forwardRef, Module } from '@nestjs/common';
import { PlantationService } from './plantation.service';
import { PlantationController } from './plantation.controller';
import { Plantation } from './entities/plantation.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersModule } from 'src/farmers/farmers.module';
import { Farmer } from 'src/farmers/entities/farmer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Plantation, Farmer]),
    forwardRef(() => FarmersModule)
  ],
  providers: [PlantationService],
  controllers: [PlantationController],
})
export class PlantationModule {}
