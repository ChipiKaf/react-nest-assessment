import { Test, TestingModule } from '@nestjs/testing';
import { HashingProvider } from './hashing.provider';
import { BcryptProvider } from './bcrypt.provider';

describe('HashingProvider', () => {
  let service: HashingProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [{ provide: HashingProvider, useClass: BcryptProvider }],
    }).compile();

    service = module.get<HashingProvider>(HashingProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
