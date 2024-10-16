import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';

@Controller('agronomists')
export class AgronomistsController {
  constructor(private readonly agronomistsService: AgronomistsService) {}

  @Post()
  async create(
    @Res() response, 
    @Body() createAgronomistDto: CreateAgronomistDto
  ) {
    try {
      const agronomist = await this.agronomistsService.createAgronomist(createAgronomistDto);

      return response.status(HttpStatus.CREATED).json({
        message: 'Agronomist successfully created',
        agronomist: {
          name: agronomist.name,
          cpf: agronomist.cpf
        }
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Agronomist not created!',
        error: 'Bad Request'
      });
    }
  }

  @Get()
  async findAll(@Res() response) {
    try {
      const agronomists = await this.agronomistsService.findAllAgronomists();

      const filteredAgronomists = agronomists.map(agronomist => ({
        name: agronomist.name,
        cpf: agronomist.cpf
      }));

      return response.status(HttpStatus.OK).json({
        message: 'All agronomists found successfully',
        agronomists: filteredAgronomists});      
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }

  @Get(':cpf')
  async findByCpf(
    @Res() response,
    @Param('cpf') cpf: string
  ) {
    try {
      const agronomist = await this.agronomistsService.findAgronomistByCpf(cpf);

      return response.status(HttpStatus.OK).json({
        message: 'Agronomist found successfully',
        agronomist});
    } catch (error) {
      return response.status(error.status).json(error.response);
    }
  }
}
