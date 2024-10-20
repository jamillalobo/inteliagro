import { Controller, Get, Post, Body, Patch, Param, Delete, Put, Res, HttpStatus } from '@nestjs/common';
import { PlantationService } from '../../application/plantation.service';
import { CreatePlantationDto } from '../../presenter/http/dto/create-plantation.dto';
import { UpdatePlantationDto } from '../../presenter/http/dto/update-plantation.dto';
import { Plantation } from '../../domain/entities/plantation.entity';

@Controller('plantations')
export class PlantationController {
  constructor(private readonly plantationService: PlantationService) {}

  @Post()
  async create(
    @Res() response,
    @Body() createPlantationDto: CreatePlantationDto): Promise<Plantation> {
    try {
      const plantation = await this.plantationService.createPlantation(createPlantationDto);
      return response.status(HttpStatus.CREATED).json({
        message: 'Plantation successfully created',
        plantation,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Plantation not created!',
        error: 'Bad Request',
      });
    }
  }

  @Get('farmer/:cpf')
  async findPlantationsByFarmer(
    @Res() response,
    @Param('cpf') cpf: string
  ): Promise<Plantation[]> {
    try {
      const plantations = await this.plantationService.findPlantationsByFarmerCpf(cpf);
      return response.status(HttpStatus.OK).json({
        message: 'All plantations found successfully',
        plantations,
      });
    } catch (error) {
      return response.status((error as any).status).json((error as any).response);
    }
  }

  @Put(':id')
  async update(
    @Res() response,
    @Param('id') id: string, 
    @Body() updatePlantationDto: UpdatePlantationDto
  ): Promise<Plantation> {
    try {
      const updatedPlantation = await this.plantationService.updatePlantation(id, updatePlantationDto);
      return response.status(HttpStatus.OK).json({
        message: 'Plantation updated successfully',
        plantation: updatedPlantation, // Ajuste conforme necessário
      });
    } catch (error) {
      console.error('Error updating plantation:', error);
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Plantation not updated!',
        error: 'Bad Request',
      });
      ;
    }
  }

  @Delete(':id')
  async delete(
    @Res() response,
    @Param('id') id: string): Promise<void> {
    try {
      await this.plantationService.deletePlantation(id);
      return response.status(HttpStatus.OK).json({
        message: 'Plantation deleted successfully',
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Error: Plantation not deleted!',
        error: 'Bad Request',
      });
    }
  }
}
