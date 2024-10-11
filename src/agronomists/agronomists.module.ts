import { Module } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { AgronomistsController } from './agronomists.controller';

@Module({
  controllers: [AgronomistsController],
  providers: [AgronomistsService],
})
export class AgronomistsModule {}
