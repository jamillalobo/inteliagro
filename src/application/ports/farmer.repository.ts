import { Farmer } from "src/domain/entities/farmer.entity";

export abstract class FarmerRepository {
    abstract save(farmer: Farmer): Promise<Farmer>;
    abstract find(): Promise<Farmer[]>;
    abstract findByCpf(cpf: string): Promise<Farmer>;
    abstract delete(id: string): Promise<void>;
}
