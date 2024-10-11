import { Injectable } from '@nestjs/common';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';
import { UpdateAgronomistDto } from './dto/update-agronomist.dto';

@Injectable()
export class AgronomistsService {
  create(createAgronomistDto: CreateAgronomistDto) {
    return 'This action adds a new agronomist';
  }

  findAll() {
    return `This action returns all agronomists`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agronomist`;
  }

  update(id: number, updateAgronomistDto: UpdateAgronomistDto) {
    return `This action updates a #${id} agronomist`;
  }

  remove(id: number) {
    return `This action removes a #${id} agronomist`;
  }
}
