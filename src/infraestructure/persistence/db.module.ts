import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Farmer } from 'src/domain/entities/farmer.entity';
import { Plantation } from 'src/domain/entities/plantation.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: '3.142.247.75', // Usa 'db' como padrão
        port: 5432, // Converte para número
        username: 'postgres',
        password: '12345678',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: false,
        entities: [Farmer, Plantation],
        migrations: ['./src/infraestructure/persistence/migrations/*.ts'], 
        migrationsRun: true,
        retryDelay: 3000,
        logging: true,
        logger: 'advanced-console',
      }),
    }),
  ],
})
export class DbModule {}
