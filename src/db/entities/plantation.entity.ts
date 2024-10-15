import { Farmer } from "src/db/entities/farmer.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";

@Entity({ name: "plantations" })
export class Plantation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column("simple-array", { name: 'combination', nullable: false })
    combination: string[] ;

    @Column({ name: 'area', type: 'float', nullable: false })
    area: number;

    @Column({ name: 'water_consumption', nullable: false })
    waterConsumption: string;

    @Column({ name: 'planting_stage', nullable: false })
    plantingStage: string;

    @Column({ name: 'location', nullable: false })
    location: string;

    @ManyToOne(() => Farmer, farmer => farmer.plantations, {
        nullable: false,
        onDelete: 'CASCADE'
    })
    farmerId: string;

}
