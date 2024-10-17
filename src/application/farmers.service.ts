import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFarmerDto } from '../presenter/http/dto/create-farmer.dto';
import { Farmer } from '../domain/entities/farmer.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Agronomist } from 'src/domain/entities/agronomist.entity';
import { CpfValidator } from 'src/utils/cpf-validation.util';
import { CepRepository } from 'src/utils/cep-repository';
import { AgronomistsService } from './agronomists.service';

@Injectable()
export class FarmersService {
  constructor(
    @InjectRepository(Farmer) private readonly farmerRepository: Repository<Farmer>,
    private readonly agronomistsService: AgronomistsService,
    private readonly cepRepository: CepRepository,
  ) { }


  async createFarmer(createFarmerDto: CreateFarmerDto): Promise<Farmer> {
    const agronomist = await this.agronomistsService.findAgronomistByCpf(createFarmerDto.agronomistCpf);

    if (!agronomist) {
      throw new Error('Agronomist not found');  
    }


    const isValidCpf = CpfValidator.isValid(createFarmerDto.cpf);
    if (!isValidCpf) {
      throw new BadRequestException('Invalid CPF');
    }

    const logradouro = await this.cepRepository.getCep(createFarmerDto.cep);

    if (!logradouro) {
      throw new Error('Could not create a client with no valid logradouro');
    }

    const farmer = this.farmerRepository.create({
      ...createFarmerDto,
      agronomist: agronomist, 
      cep: logradouro,
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
