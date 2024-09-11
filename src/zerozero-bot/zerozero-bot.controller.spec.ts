import { Test, TestingModule } from '@nestjs/testing';
import { ZerozeroBotController } from './zerozero-bot.controller';
import { ZerozeroBotService } from './zerozero-bot.service';

describe('ZerozeroBotController', () => {
  let controller: ZerozeroBotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ZerozeroBotController],
      providers: [ZerozeroBotService],
    }).compile();

    controller = module.get<ZerozeroBotController>(ZerozeroBotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
