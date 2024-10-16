import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { ZerozeroBotService } from './zerozero-bot.service';
import { CreateZerozeroBotDto } from './dto/create-zerozero-bot.dto';
import { UpdateZerozeroBotDto } from './dto/update-zerozero-bot.dto';

@Controller('zerozero-bot')
export class ZerozeroBotController {
  constructor(private readonly zerozeroBotService: ZerozeroBotService) {}

  @Post()
  create(@Body() createZerozeroBotDto: CreateZerozeroBotDto) {
    return this.zerozeroBotService.create(createZerozeroBotDto);
  }
  @Post('shopify-alarm')
  handleShopifyAlarm(@Body() shopifyAlarm: any) {
    return this.zerozeroBotService.handleShopifyAlarm(shopifyAlarm);
  }

  @Get()
  getIp(@Request() req): string {
    const ip = req.clientIp; // 获取请求的 IP 地址
    return `${ip}`;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.zerozeroBotService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateZerozeroBotDto: UpdateZerozeroBotDto,
  ) {
    return this.zerozeroBotService.update(+id, updateZerozeroBotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.zerozeroBotService.remove(+id);
  }
}
