import { Injectable } from '@nestjs/common';
import { CreatePlantationDto } from '../presenter/http/dto/create-plantation.dto';
import { UpdatePlantationDto } from '../presenter/http/dto/update-plantation.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Plantation } from '../domain/entities/plantation.entity';
import { Repository } from 'typeorm';
import { plantingCombinations } from '../utils/plantingCombinations';
import { FarmersService } from '../application/farmers.service';

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

    // Usa o array retornado por chooseCombination
    const combination = this.chooseCombination(
        createPlantationDto.area, 
        createPlantationDto.waterConsumption, 
        createPlantationDto.plantingStage
    );

    // Cria a plantação passando o array diretamente
    const plantation = this.plantationRepository.create({
        ...createPlantationDto,
        farmer: farmer,
        combination: combination,  // Passa o array diretamente
        waterConsumption: createPlantationDto.waterConsumption.toString(),
        plantingStage: createPlantationDto.plantingStage.toString(),
    });

    return await this.plantationRepository.save(plantation);
}


  async findPlantationsByFarmerCpf(cpf: string): Promise<Plantation[]> {

    const farmer = await this.farmerService.findFarmerByCpf(cpf);

    console.log(farmer);
    if (!farmer) {
      throw new Error('Farmer not found');
    }

    return await this.plantationRepository.find({
      where: { farmer: { id: farmer.id } },  
      });
  }

  async updatePlantation(id: string, updatePlantationDto: UpdatePlantationDto): Promise<Plantation> {

    // Gera a nova combinação
    const combinationUpdate = this.chooseCombination(
      updatePlantationDto.area, 
      updatePlantationDto.waterConsumption, 
      updatePlantationDto.plantingStage
    );

    if (!combinationUpdate) {
      throw new Error("Couldn't create combination!");
    }

    const plantation = await this.plantationRepository.findOne({
      where: { id },
      relations: ['farmer'] 
    });
  
    if (!plantation) {
      throw new Error('Plantation not found');
    }

    plantation.area = updatePlantationDto.area;
    plantation.waterConsumption = updatePlantationDto.waterConsumption;
    plantation.plantingStage = updatePlantationDto.plantingStage;
    plantation.combination = combinationUpdate;

    await this.plantationRepository.save(plantation);
  
    return plantation;
  }
  

  async deletePlantation(id: string): Promise<void> {
    await this.plantationRepository.delete(id);
  }

  chooseCombination(area: number, waterConsumption: string, plantingStage: string): string {
    for (const key in plantingCombinations) {
        const combination = plantingCombinations[key];
        if (
            combination.area <= area &&
            combination.waterConsumption === waterConsumption &&
            combination.plantingStage === plantingStage
        ) {
            console.log(combination.species);
            return combination.species.join(', '); // Return the array directly

        }
    }
    // Retorna um array vazio ou um array com uma mensagem padrão em vez de uma string:
    return 'Combination not found';
  }
}

