import { Test, TestingModule } from '@nestjs/testing';
import { ZerozeroBotService } from './zerozero-bot.service';

describe('ZerozeroBotService', () => {
  let service: ZerozeroBotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ZerozeroBotService],
    }).compile();

    service = module.get<ZerozeroBotService>(ZerozeroBotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
