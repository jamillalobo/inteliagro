import { Controller, Get, Post, Body, Patch, Param, Delete, Res } from '@nestjs/common';
import { FarmersService } from '../../application/farmers.service';
import { CreateFarmerDto } from './dto/create-farmer.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('farmers')
@ApiTags('farmers')
export class FarmersController {
  constructor(private readonly farmersService: FarmersService) {}

  @Post()
  @ApiOperation({ summary: 'create a new farmer'})
  async create(
    @Res() response,
    @Body() createFarmerDto: CreateFarmerDto
  ) {
    try {
      const farmer = await this.farmersService.createFarmer(createFarmerDto);
      return response.status(201).json({
        message: 'Farmer successfully created',
        farmer: {
          name: farmer.name,
          cpf: farmer.cpf
        }
      });
    } catch (error) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Error: Farmer not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  @ApiOperation({ summary: 'list all farmers'})
  async findAll(@Res() response) {
    try {
      const farmers = await this.farmersService.findAllFarmers();
      const filteredFarmers = farmers.map(farmer => ({
        name: farmer.name,
        cpf: farmer.cpf,
      }));
      return response.status(200).json({
        message: 'All farmers found successfully',
        farmers: filteredFarmers
      });
    } catch (error) {
      return response.status((error as any).status).json((error as any).response);
    }
  }

  @Get(':cpf')
  @ApiOperation({ summary: 'find farmer by cpf'})
  async findByCpf(
    @Res() response,
    @Param('cpf') cpf: string
  ) {
    try {
      const farmer = await this.farmersService.findFarmerByCpf(cpf);

      return response.status(200).json({
        message: 'Farmer found successfully',
        farmer})
    } catch (error) {
      return response.status((error as any).status).json((error as any).response);
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'delete an existing farmer'})
  async delete(
    @Res() response,
    @Param('id') id: string) {
    try {
      await this.farmersService.deleteFarmer(id);
      return response.status(200).json({
        message: 'Farmer deleted successfully'
      });
    } catch (error) {
      return response.status(400).json({
        statusCode: 400,
        message: 'Error: Farmer not deleted!',
        error: 'Bad Request'
      });
    }
  }
}
