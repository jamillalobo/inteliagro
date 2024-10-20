import { forwardRef, Module } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { FarmersController } from '../presenter/http/farmers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from '../domain/entities/farmer.entity';
import { PlantationModule } from './plantation.module';
import { CepRepository } from 'src/utils/cep-repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farmer]),
    forwardRef(() => PlantationModule),
  ],
  exports: [FarmersService],
  controllers: [FarmersController],
  providers: [FarmersService, CepRepository],
})
export class FarmersModule {}
