import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { PlantationService } from './plantation.service';
import { CreatePlantationDto } from './dto/create-plantation.dto';
import { UpdatePlantationDto } from './dto/update-plantation.dto';
import { Plantation } from './entities/plantation.entity';

@Controller('plantations')
export class PlantationController {
  constructor(private readonly plantationService: PlantationService) {}

  @Post()
  create(@Body() createPlantationDto: CreatePlantationDto): Promise<Plantation> {
    return this.plantationService.createPlantation(createPlantationDto);
  }

  @Get('farmer/:id')
  findPlantationsByFarmer(@Param('id') id: string): Promise<Plantation[]> {
    return this.plantationService.findPlantationsByFarmer(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string, 
    @Body() updatePlantationDto: UpdatePlantationDto
  ): Promise<Plantation> {
    return this.plantationService.updatePlantation(id, updatePlantationDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.plantationService.deletePlantation(id);
  }
}
