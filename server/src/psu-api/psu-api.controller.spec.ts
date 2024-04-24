import { Test, TestingModule } from '@nestjs/testing';
import { PsuApiController } from './psu-api.controller';
import { PsuApiService } from './psu-api.service';

describe('PsuApiController', () => {
  let controller: PsuApiController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PsuApiController],
      providers: [PsuApiService],
    }).compile();

    controller = module.get<PsuApiController>(PsuApiController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
