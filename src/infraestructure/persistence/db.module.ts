import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: 'localhost', // Usa 'db' como padrão
        port: 5432, // Converte para número
        username: 'postgres',
        password: '12345678',
        database: 'postgres',
        autoLoadEntities: true,
        synchronize: false,
        migrations: ['./src/infraestructure/persistence/migrations/*.ts'], // Corrigi a grafia de 'infraestructure' para 'infrastructure'
        retryDelay: 3000,
        logging: true,
        logger: 'advanced-console',
      }),
    }),
  ],
})
export class DbModule {}
