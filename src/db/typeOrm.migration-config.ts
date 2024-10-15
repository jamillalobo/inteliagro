import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Agronomist } from './entities/agronomist.entity';
import { Farmer } from './entities/farmer.entity';
import { Plantation } from './entities/plantation.entity';

config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: [Agronomist, Farmer, Plantation],
  synchronize: false,
  migrations: [__dirname + '/migrations/*.ts'],
  migrationsRun: true,
});

AppDataSource.initialize()
.then(() => {
  console.log("Data Source has been initialized!")
})
.catch((err) => {
  console.error("Error during Data Source initialization", err)
});