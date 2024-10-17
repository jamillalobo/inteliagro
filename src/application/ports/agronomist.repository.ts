import { Agronomist } from "src/domain/entities/agronomist.entity";

export abstract class AgronomistRepository {
    abstract save(agronomist: Agronomist): Promise<Agronomist>;
    abstract find(): Promise<Agronomist[]>;
    abstract finByCpf(cpf: string): Promise<Agronomist>;
}