import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as requestIp from 'request-ip';

@Injectable()
export class IpMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    requestIp.mw()(req, res, () => {
      next();
    });
  }
}
