import { Injectable } from '@nestjs/common';
import { CreateZerozeroBotDto } from './dto/create-zerozero-bot.dto';
import { UpdateZerozeroBotDto } from './dto/update-zerozero-bot.dto';

@Injectable()
export class ZerozeroBotService {
  create(createZerozeroBotDto: CreateZerozeroBotDto) {
    console.log(createZerozeroBotDto);
    return 'This action adds a new zerozeroBot';
  }

  findAll() {
    return `This action returns all zerozeroBot`;
  }

  findOne(id: number) {
    return `This action returns a #${id} zerozeroBot`;
  }

  update(id: number, updateZerozeroBotDto: UpdateZerozeroBotDto) {
    return `This action updates a #${id} zerozeroBot`;
  }

  remove(id: number) {
    return `This action removes a #${id} zerozeroBot`;
  }
}
