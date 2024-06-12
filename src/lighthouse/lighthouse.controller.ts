import {
  Controller,
  Get,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { LighthouseService } from './lighthouse.service';
import { Response } from 'express';
import { LighthouseReportDto } from './dto/lighthouse-report.dto';

@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  async getLighthouseReport(
    @Query() query: LighthouseReportDto,
    @Res() res: Response,
  ) {
    const { url, times } = query;

    try {
      const json = await this.lighthouseService.handleTest({ url, times });
      return res.json(json);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      return res.status(500).send('Internal server error');
    }
  }
}
