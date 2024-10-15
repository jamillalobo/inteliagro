import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { Farmer } from '../db/entities/farmer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer) private readonly farmerRepository: Repository<Farmer>,
  ) { }

  async createFarmer(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    // Criar o objeto da conta
    const farmer = this.farmerRepository.create(createFarmerDto) as Farmer;

    const newFarmer = this.farmerRepository.save(farmer);

    return newFarmer;
  }

  async findAllFarmers(): Promise<Farmer[]> {
    const farmers = await this.farmerRepository.find();

    if (farmers.length === 0 || !farmers) {
      throw new NotFoundException('No farmers found');
    }

    return farmers;
  }

  async findFarmerById(id: string): Promise<Farmer> {
    const farmer = await this.farmerRepository.findOne({ 
      where: { id }, 
      relations: ['transactions'], 
    });
  
    if (!farmer) {
      throw new NotFoundException('farmer not found');
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
