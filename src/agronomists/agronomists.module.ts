import { forwardRef, Module } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { AgronomistsController } from './agronomists.controller';
import { Agronomist } from './entities/agronomist.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmersModule } from 'src/farmers/farmers.module';

@Module({
  imports: [TypeOrmModule.forFeature([Agronomist]),
  forwardRef(() => FarmersModule)],
  exports: [AgronomistsService],
  controllers: [AgronomistsController],
  providers: [AgronomistsService],
})
export class AgronomistsModule {}
