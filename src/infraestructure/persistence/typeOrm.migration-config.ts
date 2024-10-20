import { config } from 'dotenv';
import { Farmer } from 'src/domain/entities/farmer.entity';
import { Plantation } from 'src/domain/entities/plantation.entity';
import { DataSource } from 'typeorm';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: '3.142.247.75', 
  port: 5432, 
  username: 'postgres',
  password: '12345678',
  database: 'postgres',
  entities: [Farmer, Plantation],
  migrations: ['./src/infraestructure/migrations/*.ts'], 
  synchronize: false,
  migrationsRun: true,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
