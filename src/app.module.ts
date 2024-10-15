import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AgronomistsModule } from './agronomists/agronomists.module';
import { FarmersModule } from './farmers/farmers.module';
import { PlantationModule } from './plantation/plantation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true,
    }),
    AgronomistsModule, FarmersModule, PlantationModule, DbModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
