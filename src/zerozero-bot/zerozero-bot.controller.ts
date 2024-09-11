import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

  @Get()
  findAll() {
    return this.zerozeroBotService.findAll();
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
