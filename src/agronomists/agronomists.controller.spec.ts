import { Test, TestingModule } from '@nestjs/testing';
import { AgronomistsController } from './agronomists.controller';
import { AgronomistsService } from './agronomists.service';

describe('AgronomistsController', () => {
  let controller: AgronomistsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AgronomistsController],
      providers: [AgronomistsService],
    }).compile();

    controller = module.get<AgronomistsController>(AgronomistsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
