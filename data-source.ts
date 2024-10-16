import { Agronomist } from "src/agronomists/entities/agronomist.entity";
import { Farmer } from "src/farmers/entities/farmer.entity";
import { Plantation } from "src/plantation/entities/plantation.entity";
import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username:'postgres',
    password: '12345678',
    database: 'postgres',
    entities: [Farmer, Agronomist, Plantation],
    migrations: ['./src/migration/*.ts'],
    synchronize: true, //auto reinicia o banco toda vez que roda a aplicação
});