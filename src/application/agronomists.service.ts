import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgronomistDto } from '../presenter/http/dto/create-agronomist.dto';
import { Agronomist } from '../domain/entities/agronomist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CpfValidator } from 'src/utils/cpf-validation.util';

@Injectable()
export class AgronomistsService {
  constructor(
    @InjectRepository(Agronomist) private readonly agronomistRepository: Repository<Agronomist>
  ) {}

  async createAgronomist(createAgronomistDto: CreateAgronomistDto): Promise<Agronomist> {

    const { cpf } = createAgronomistDto;

    const isValidCpf = CpfValidator.isValid(cpf);
    if (!isValidCpf) {
      throw new BadRequestException('Invalid CPF');
    }

    const newagronomist = await this.agronomistRepository.save(createAgronomistDto);

    return newagronomist;
  }

  async findAllAgronomists(): Promise<any[]> {
    const agronomists = await this.agronomistRepository.createQueryBuilder('agronomist')
        .leftJoinAndSelect('agronomist.farmers', 'farmers')  
        .select([
            'agronomist.id', 
            'agronomist.name', 
            'agronomist.cpf', 
            'farmers.id',   
            'farmers.cpf'    
        ])
        .getMany();  

    if (!agronomists || agronomists.length === 0) {
        throw new NotFoundException('No agronomists found');
    }

    return agronomists;
  }

  async findAgronomistByCpf(cpf: string): Promise<any> {
    const agronomist = await this.agronomistRepository.createQueryBuilder('agronomist')
        .leftJoinAndSelect('agronomist.farmers', 'farmers')  
        .select([
            'agronomist.id', 
            'agronomist.name', 
            'agronomist.cpf', 
            'farmers.id',      
            'farmers.cpf'        
        ])
        .where('agronomist.cpf = :cpf', { cpf })
        .getOne();
  
    if (!agronomist) {
        throw new NotFoundException('Agronomist not found');
    }

    return agronomist;
  }

}
