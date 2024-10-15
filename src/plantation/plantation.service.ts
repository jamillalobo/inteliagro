import { Injectable } from '@nestjs/common';
import { CreatePlantationDto } from './dto/create-plantation.dto';
import { UpdatePlantationDto } from './dto/update-plantation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantation } from '../db/entities/plantation.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlantationService {
  constructor(
    @InjectRepository(Plantation) private readonly plantationRepository: Repository<Plantation>
  ) {}

  async createPlantation(createPlantationDto: CreatePlantationDto): Promise<Plantation> {
    const plantation = this.plantationRepository.create(createPlantationDto);

    const combination = this.chooseCombination(plantation.area, plantation.waterConsumption, plantation.plantingStage);

    if(!combination) {
      throw new Error("couldn't create combination!");
    }

    return await this.plantationRepository.save(plantation);
  }

  async findPlantationsByFarmer(id: string): Promise<Plantation[]> {
    return await this.plantationRepository.find({
      where: { farmerId: id },  
    });
  }

  async updatePlantation(id: string, updatePlantationDto: UpdatePlantationDto): Promise<Plantation> {
    await this.plantationRepository.update(id, updatePlantationDto);
    return await this.plantationRepository.findOneBy({ id });
  }

  async deletePlantation(id: string): Promise<void> {
    await this.plantationRepository.delete(id);
  }

  chooseCombination(area: number, waterConsumption: string, plantingStage: string) {
    for (const key in plantingCombinations) {
        const combination = plantingCombinations[key];
        if (combination.area <= area && 
            combination.waterConsumption === waterConsumption &&
            combination.plantingStage === plantingStage) {
            return combination.species;
        }
    }
    return "No combination found for the provided criteria.";
  }

}
