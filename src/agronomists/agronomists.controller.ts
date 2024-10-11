import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AgronomistsService } from './agronomists.service';
import { CreateAgronomistDto } from './dto/create-agronomist.dto';
import { UpdateAgronomistDto } from './dto/update-agronomist.dto';

@Controller('agronomists')
export class AgronomistsController {
  constructor(private readonly agronomistsService: AgronomistsService) {}

  @Post()
  create(@Body() createAgronomistDto: CreateAgronomistDto) {
    return this.agronomistsService.create(createAgronomistDto);
  }

  @Get()
  findAll() {
    return this.agronomistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agronomistsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAgronomistDto: UpdateAgronomistDto) {
    return this.agronomistsService.update(+id, updateAgronomistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agronomistsService.remove(+id);
  }
}
