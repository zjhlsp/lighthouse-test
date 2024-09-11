import { Module } from '@nestjs/common';
import { ZerozeroBotService } from './zerozero-bot.service';
import { ZerozeroBotController } from './zerozero-bot.controller';

@Module({
  controllers: [ZerozeroBotController],
  providers: [ZerozeroBotService]
})
export class ZerozeroBotModule {}
