import { Plantation } from "src/domain/entities/plantation.entity";

export abstract class PlantationRepository {
    abstract save(plantation: Plantation): Promise<Plantation>;
    abstract find(): Promise<Plantation[]>;
    abstract findByFarmerId(farmerId: string): Promise<Plantation[]>;
    abstract delete(id: string): Promise<void>;
}