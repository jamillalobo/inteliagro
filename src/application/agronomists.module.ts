import { forwardRef, Module } from '@nestjs/common';
import { AgronomistsService } from '../application/agronomists.service';
import { AgronomistsController } from '../presenter/http/agronomists.controller';
import { Agronomist } from '../domain/entities/agronomist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersModule } from 'src/application/farmers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agronomist]),
  forwardRef(() => FarmersModule)],
  exports: [AgronomistsService],
  controllers: [AgronomistsController],
  providers: [AgronomistsService],
})
export class AgronomistsModule {}
