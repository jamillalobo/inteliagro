import { Agronomist } from "src/domain/entities/agronomist.entity";
import { Plantation } from "src/domain/entities/plantation.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "farmers" })
export class Farmer {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', nullable: false })
    name: string;

    @Column({ name: 'cpf', nullable: false, unique: true })
    cpf: string;

    @Column({ name: 'cep', nullable: false })
    cep: string;

    @ManyToOne(() => Agronomist, (agronomist) => agronomist.farmers, {
        nullable: false,
        onDelete: 'CASCADE'  
    })
    agronomist: Agronomist;

    @Column({ name: 'size_property', nullable: false })
    sizeProperty: number;

    @OneToMany(() => Plantation, (plantation) => plantation.farmer, {
        cascade: true,
        eager: true,
    })
    plantations: Plantation[];

    @Column({ name: 'created_at', type: 'timestamptz' })
    createdAt: Date;

}
