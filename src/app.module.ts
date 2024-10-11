import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AgronomistsModule } from './agronomists/agronomists.module';
import { FarmersModule } from './farmers/farmers.module';

@Module({
  imports: [AgronomistsModule, FarmersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
