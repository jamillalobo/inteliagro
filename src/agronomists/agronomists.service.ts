import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';
import { Agronomist } from '../db/entities/agronomist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AgronomistsService {
  constructor(
    @InjectRepository(Agronomist) private readonly agronomistRepository: Repository<Agronomist>,
  ) {}

  async createAgronomist(createAgronomistDto: CreateAgronomistDto): Promise<Agronomist> {

    const newagronomist = await this.agronomistRepository.save(createAgronomistDto);

    return newagronomist;
  }

  async findAllAgronomists(): Promise<Agronomist[]> {
   const agronomists = await this.agronomistRepository.find();

   if(!agronomists || agronomists.length === 0) {
     throw new NotFoundException('No agronomists found');
   }

    return agronomists;
  }

  async findAgronomistByCpf(cpf: string): Promise<Agronomist> {
    const agronomist = await this.agronomistRepository.findOne({
      where: { cpf },
      relations: ['farmers'], // join qu inclui contas associadas 
    });
  
    if (!agronomist) {
      throw new NotFoundException('agronomist not found');
    }
    return agronomist;
  }
}
