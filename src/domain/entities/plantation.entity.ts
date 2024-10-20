import { Farmer } from "src/domain/entities/farmer.entity";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: "plantations" })
export class Plantation {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'combination', nullable: false })
    combination: string;

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
    @JoinColumn({ name: 'farmer_id' })
    farmer: Farmer;

}
