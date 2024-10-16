import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgronomistsModule } from './agronomists/agronomists.module';
import { FarmersModule } from './farmers/farmers.module';
import { PlantationModule } from './plantation/plantation.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(), // Adicione isto
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db', // Use a variável de ambiente ou 'db' como padrão
      port: +process.env.DB_PORT || 5432, // Converta para número
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '12345678',
      database: process.env.DB_NAME || 'postgres',
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 3000,
      logging: true,
    }),
    AgronomistsModule,
    FarmersModule,
    PlantationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}