import { forwardRef, Module } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { FarmersController } from './farmers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from './entities/farmer.entity';
import { Agronomist } from 'src/agronomists/entities/agronomist.entity';
import { AgronomistsModule } from 'src/agronomists/agronomists.module';
import { PlantationModule } from 'src/plantation/plantation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farmer, Agronomist]), // Add Agronomist entity here
    forwardRef(() => AgronomistsModule),
    forwardRef(() => PlantationModule)
  ],
  exports: [FarmersService],
  controllers: [FarmersController],
  providers: [FarmersService],
})
export class FarmersModule {}
