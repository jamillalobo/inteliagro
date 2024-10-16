import { Injectable } from '@nestjs/common';
import { CreatePlantationDto } from './dto/create-plantation.dto';
import { UpdatePlantationDto } from './dto/update-plantation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantation } from './entities/plantation.entity';
import { Repository } from 'typeorm';
import { plantingCombinations } from './plantingCombinations';
import { Farmer } from 'src/farmers/entities/farmer.entity';
import { FarmersService } from 'src/farmers/farmers.service';

@Injectable()
export class PlantationService {
  constructor(
    @InjectRepository(Plantation) private readonly plantationRepository: Repository<Plantation>,
    private readonly farmerService: FarmersService,
  ) {}

  async createPlantation(createPlantationDto: CreatePlantationDto): Promise<Plantation> {
    const farmer = await this.farmerService.findFarmerByCpf(createPlantationDto.farmerCpf);

    if (!farmer) {
      throw new Error('Farmer not found');
    }

    const combination = this.chooseCombination(createPlantationDto.area, createPlantationDto.waterConsumption, createPlantationDto.plantingStage);
  
    if(!combination) {
      throw new Error("couldn't create combination!");
    }

    const plantation = this.plantationRepository.create({
      ...createPlantationDto,
      farmer: farmer,
      combination: combination 
  });

    return await this.plantationRepository.save(plantation);
  }

  async findPlantationsByFarmer(id: string): Promise<Plantation[]> {
    return await this.plantationRepository.find({
      where: { farmer: { id } },  // Corrige o relacionamento
    });
  }
  

  async updatePlantation(id: string, updatePlantationDto: UpdatePlantationDto): Promise<Plantation> {

    const combinationUpdate = this.chooseCombination(updatePlantationDto.area, updatePlantationDto.waterConsumption, updatePlantationDto.plantingStage);
    
    if(!combinationUpdate) {
      throw new Error("couldn't create combination!");
    }

    await this.plantationRepository.update(id, {
      ...updatePlantationDto,
      combination: combinationUpdate 
    });

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
