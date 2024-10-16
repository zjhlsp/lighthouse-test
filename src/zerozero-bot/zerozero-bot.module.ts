import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ZerozeroBotService } from './zerozero-bot.service';
import { ZerozeroBotController } from './zerozero-bot.controller';
import { IpMiddleware } from './ip.middleware';
@Module({
  controllers: [ZerozeroBotController],
  providers: [ZerozeroBotService],
})
export class ZerozeroBotModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpMiddleware).forRoutes('*'); // 或者指定特定的路由
  }
}
