import { Module } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { AgronomistsController } from './agronomists.controller';
import { Agronomist } from '../db/entities/agronomist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Agronomist])],
  controllers: [AgronomistsController],
  providers: [AgronomistsService],
})
export class AgronomistsModule {}
