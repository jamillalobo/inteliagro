import { config } from 'dotenv';
import { Agronomist } from 'src/domain/entities/agronomist.entity';
import { Farmer } from 'src/domain/entities/farmer.entity';
import { Plantation } from 'src/domain/entities/plantation.entity';
import { DataSource } from 'typeorm';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost', 
  port: 5432, 
  username: 'postgres',
  password: '12345678',
  database: 'postgres',
  entities: [Farmer, Agronomist, Plantation],
  migrations: ['./src/infraestructure/migrations/*.ts'], 
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
