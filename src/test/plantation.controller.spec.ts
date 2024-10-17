import { Test, TestingModule } from '@nestjs/testing';
import { PlantationController } from './plantation.controller';
import { PlantationService } from './plantation.service';

describe('PlantationController', () => {
  let controller: PlantationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlantationController],
      providers: [PlantationService],
    }).compile();

    controller = module.get<PlantationController>(PlantationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
