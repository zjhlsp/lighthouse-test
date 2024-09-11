import { PartialType } from '@nestjs/mapped-types';
import { CreateZerozeroBotDto } from './create-zerozero-bot.dto';

export class UpdateZerozeroBotDto extends PartialType(CreateZerozeroBotDto) {}
