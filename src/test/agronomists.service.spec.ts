import { Test, TestingModule } from '@nestjs/testing';
import { AgronomistsService } from '../application/agronomists.service';

describe('AgronomistsService', () => {
  let service: AgronomistsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AgronomistsService],
    }).compile();

    service = module.get<AgronomistsService>(AgronomistsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
