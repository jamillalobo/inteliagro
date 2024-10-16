import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { Farmer } from './entities/farmer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Agronomist } from 'src/agronomists/entities/agronomist.entity';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Agronomist) private readonly agronomistRepository: Repository<Agronomist>,
    @InjectRepository(Farmer) private readonly farmerRepository: Repository<Farmer>,
  ) { }


  async createFarmer(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    // Find the agronomist by the provided agronomistId
    const agronomist = await this.agronomistRepository.findOne({
      where: { id: createFarmerDto.agronomistId },
    });

    if (!agronomist) {
      throw new Error('Agronomist not found');  // Handle agronomist not found
    }

    // Create the farmer with the agronomist relationship
    const farmer = this.farmerRepository.create({
      ...createFarmerDto,
      agronomist,  // Associate the agronomist with the farmer
      createdAt: new Date(),
    });

    return this.farmerRepository.save(farmer);
  }

  async findAllFarmers(): Promise<Farmer[]> {
    const farmers = await this.farmerRepository.find();

    if (farmers.length === 0 || !farmers) {
      throw new NotFoundException('No farmers found');
    }

    return farmers;
  }

  async findFarmerByCpf(cpf: string): Promise<any> {
    const farmer = await this.farmerRepository.createQueryBuilder('farmer')
        .leftJoinAndSelect('farmer.agronomist', 'agronomist')  // Join com Agronomist
        .leftJoinAndSelect('farmer.plantations', 'plantations') // Join com Plantations
        .select([
            'farmer.id', 
            'farmer.name', 
            'farmer.cpf', 
            'farmer.cep', 
            'farmer.sizeProperty', 
            'farmer.createdAt',
            'agronomist.id',         // Seleciona apenas o id do agronomist
            'plantations.id',        // Seleciona os campos das plantations
            'plantations.combination',
            'plantations.area',
            'plantations.waterConsumption',
            'plantations.plantingStage',
            'plantations.location'
        ])
        .where('farmer.cpf = :cpf', { cpf })
        .getOne();
  
    if (!farmer) {
        throw new NotFoundException('Farmer not found');
    }

    return farmer;
  }


  
  async deleteFarmer(id: string): Promise<Farmer> {
    const farmer = this.farmerRepository.findOne({ where: { id } });

    if (!farmer) {
      throw new NotFoundException(`farmer not found`);
    }

    this.farmerRepository.delete(id);

    return farmer;
  }
}
