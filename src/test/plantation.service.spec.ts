import { Test, TestingModule } from '@nestjs/testing';
import { PlantationService } from '../application/plantation.service';

describe('PlantationService', () => {
  let service: PlantationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlantationService],
    }).compile();

    service = module.get<PlantationService>(PlantationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
