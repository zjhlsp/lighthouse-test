import { Controller, Get, Query, Res } from '@nestjs/common';
import { LighthouseService } from './lighthouse.service';
import { Response } from 'express';

@Controller('lighthouse')
export class LighthouseController {
  constructor(private readonly lighthouseService: LighthouseService) {}

  @Get()
  async getLighthouseReport(
    @Query('url') url: string,
    @Query('times') times: number,
    @Res() res: Response,
  ) {
    if (!url) {
      return res.status(400).send('URL is required');
    }

    try {
      this.lighthouseService.handleTest({ url, times }).then((json) => {
        res.json(json);
      });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).send('Internal server error');
    }
  }
}
