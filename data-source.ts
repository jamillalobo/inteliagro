import { config } from "dotenv";
import { Agronomist } from "src/domain/entities/agronomist.entity";
import { Farmer } from "src/domain/entities/farmer.entity";
import { Plantation } from "src/domain/entities/plantation.entity";
import { DataSource } from "typeorm";

config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST, // Altere 'localhost' para 'db'
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [Farmer, Agronomist, Plantation],
    migrations: ['./src/infraestructure/persistence/migration/*.ts'],
    synchronize: false,
    migrationsRun: true,// auto reinicia o banco toda vez que roda a aplicação
});

AppDataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
});