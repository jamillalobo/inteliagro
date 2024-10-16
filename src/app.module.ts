import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgronomistsModule } from './agronomists/agronomists.module';
import { FarmersModule } from './farmers/farmers.module';
import { PlantationModule } from './plantation/plantation.module';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password: '12345678',
    database: 'postgres',
    autoLoadEntities: true,
    synchronize: true,
    retryAttempts: 5,                  
    retryDelay: 3000,  
    logging: true,
  }), 
    AgronomistsModule, FarmersModule, PlantationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
