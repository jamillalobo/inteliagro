import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class AgronomistsFarmersPlantationsTables1729301843646 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Creating the farmers table
        await queryRunner.createTable(
            new Table({
                name: "farmers",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "name",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isUnique: true,
                        isNullable: false,
                    },
                    {
                        name: "cep",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "size_property",
                        type: "float",
                        isNullable: false,
                    },
                    {
                        name: "created_at",
                        type: "timestamptz",
                        default: "CURRENT_TIMESTAMP",
                    },
                ],
            })
        );

        // Creating the plantations table
        await queryRunner.createTable(
            new Table({
                name: "plantations",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "uuid",
                    },
                    {
                        name: "combination",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "area",
                        type: "float",
                        isNullable: false,
                    },
                    {
                        name: "water_consumption",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "planting_stage",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: false,
                    },
                    {
                        name: "farmer_id",
                        type: "uuid",
                        isNullable: false,
                    },
                ],
            })
        );

        // Creating the foreign key relation between plantations and farmers
        await queryRunner.createForeignKey(
            "plantations",
            new TableForeignKey({
                columnNames: ["farmer_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "farmers",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Dropping the foreign key first
        await queryRunner.dropForeignKey("plantations", "FK_farmer_plantations");

        // Dropping the plantations table
        await queryRunner.dropTable("plantations");

        // Dropping the farmers table
        await queryRunner.dropTable("farmers");
    }
}
