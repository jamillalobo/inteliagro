// import { MigrationInterface, QueryRunner } from "typeorm";

// export class  $npmConfigName1729009400918 implements MigrationInterface {

//     public async up(queryRunner: QueryRunner): Promise<void> {
//         // Criação da extensão para UUID
//         await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
    
//         // Criação da tabela de Agronomists
//         await queryRunner.query(`
//           CREATE TABLE agronomists (
//             id uuid NOT NULL DEFAULT uuid_generate_v4(),
//             name varchar(256) NOT NULL,
//             cpf varchar(11) NOT NULL UNIQUE,
//             email varchar(256) NOT NULL UNIQUE,
//             CONSTRAINT agronomist_pk PRIMARY KEY (id)
//           );
//         `);
    
//         // Criação da tabela de Farmers
//         await queryRunner.query(`
//           CREATE TABLE farmers (
//             id uuid NOT NULL DEFAULT uuid_generate_v4(),
//             name varchar(256) NOT NULL,
//             cpf varchar(11) NOT NULL UNIQUE,
//             cep varchar(8) NOT NULL,
//             agronomist_id uuid NOT NULL,
//             phone varchar(15),
//             size_property float NOT NULL,
//             created_at date NOT NULL,
//             CONSTRAINT farmer_pk PRIMARY KEY (id),
//             CONSTRAINT farmer_fk_agronomist FOREIGN KEY (agronomist_id) REFERENCES agronomists(id) ON DELETE CASCADE
//           );
//         `);
    
//         // Criação da tabela de Plantations
//         await queryRunner.query(`
//           CREATE TABLE plantations (
//             id uuid NOT NULL DEFAULT uuid_generate_v4(),
//             combination varchar(256)[] NOT NULL,
//             area float NOT NULL,
//             water_consumption varchar(256) NOT NULL,
//             planting_stage varchar(256) NOT NULL,
//             location varchar(256) NOT NULL,
//             farmer_id uuid NOT NULL,
//             CONSTRAINT plantation_pk PRIMARY KEY (id),
//             CONSTRAINT plantation_fk_farmer FOREIGN KEY (farmer_id) REFERENCES farmers(id) ON DELETE CASCADE
//           );
//         `);
//       }
    
//       public async down(queryRunner: QueryRunner): Promise<void> {
//         // Drop da tabela de Plantations
//         await queryRunner.query(`DROP TABLE IF EXISTS plantations;`);
    
//         // Drop da tabela de Farmers
//         await queryRunner.query(`DROP TABLE IF EXISTS farmers;`);
    
//         // Drop da tabela de Agronomists
//         await queryRunner.query(`DROP TABLE IF EXISTS agronomists;`);
//       }

// }
