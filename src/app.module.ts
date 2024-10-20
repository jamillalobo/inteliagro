import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { FarmersModule } from './application/farmers.module';
import { PlantationModule } from './application/plantation.module';
import { HttpModule } from '@nestjs/axios';
import { CepRepository } from './utils/cep-repository';
import { DbModule } from './infraestructure/persistence/db.module'; // Corrigi a grafia de 'infraestructure' para 'infrastructure'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // Habilita o ConfigModule globalmente
    FarmersModule,
    PlantationModule,
    HttpModule,
    DbModule,
  ],
  controllers: [],
  providers: [CepRepository],
  exports: [CepRepository],
})
export class AppModule {}
