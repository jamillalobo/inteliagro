import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FarmersService } from './farmers.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';

@Controller('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  create(@Body() createFarmerDto: CreateFarmerDto) {
    return this.farmersService.createFarmer(createFarmerDto);
  }

  @Get()
  findAll() {
    return this.farmersService.findAllFarmers();
  }

  @Get(':cpf')
  findByCpf(@Param('cpf') cpf: string) {
    return this.farmersService.findFarmerByCpf(cpf);
  }


  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.farmersService.deleteFarmer(id);
  }
}
