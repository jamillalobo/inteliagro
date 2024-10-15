import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';

@Controller('agronomists')
export class AgronomistsController {
  constructor(private readonly agronomistsService: AgronomistsService) {}

  @Post()
  create(@Body() createAgronomistDto: CreateAgronomistDto) {
    return this.agronomistsService.createAgronomist(createAgronomistDto);
  }

  @Get()
  findAll() {
    return this.agronomistsService.findAllAgronomists();
  }

  @Get(':cpf')
  findByCpf(@Param('cpf') cpf: string) {
    return this.agronomistsService.findAgronomistByCpf(cpf);
  }
}
