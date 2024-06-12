import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';
import { LighthouseController } from './lighthouse/lighthouse.controller';
import { LighthouseService } from './lighthouse/lighthouse.service';

@Module({
  imports: [],
  controllers: [AppController, LighthouseController],
  providers: [AppService, LighthouseService],
})
export class AppModule {}
