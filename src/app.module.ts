import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { LighthouseController } from './lighthouse/lighthouse.controller';
import { LighthouseService } from './lighthouse/lighthouse.service';
import { ZerozeroBotModule } from './zerozero-bot/zerozero-bot.module';

@Module({
  imports: [ZerozeroBotModule],
  controllers: [AppController, LighthouseController],
  providers: [AppService, LighthouseService],
})
export class AppModule {}
