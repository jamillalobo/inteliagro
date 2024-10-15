import { Farmer } from "src/db/entities/farmer.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "agronomists" })
export class Agronomist {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'cpf', nullable: false, unique: true })
    cpf: string;

    @Column({ name: 'email', nullable: false, unique: true })
    email: string;

    @OneToMany(() => Farmer, (farmer) => farmer.agronomist, {
        cascade: true,
        eager: true      
    })
    farmers: Farmer[];  
}
