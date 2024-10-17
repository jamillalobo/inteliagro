import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AgronomistsModule } from './application/agronomists.module';
import { FarmersModule } from './application/farmers.module';
import { PlantationModule } from './application/plantation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { CepRepository } from './utils/cep-repository';

@Module({
  imports: [
    ConfigModule.forRoot(), // Adicione isto
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db', // Use a variável de ambiente ou 'db' como padrão
      port: +process.env.DB_PORT, // Converta para número
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      migrations: ['.src/infraestructure/persistence/migrations/*.ts'],
      autoLoadEntities: true,
      synchronize: false,
      retryDelay: 3000,
      logging: true,
    }),
    AgronomistsModule,
    FarmersModule,
    PlantationModule,
    HttpModule,
  ],
  controllers: [],
  providers: [CepRepository],
  exports: [CepRepository],
})
export class AppModule {}