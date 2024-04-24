import { Test, TestingModule } from '@nestjs/testing';
import { PsuApiService } from './psu-api.service';

describe('PsuApiService', () => {
  let service: PsuApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PsuApiService],
    }).compile();

    service = module.get<PsuApiService>(PsuApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
