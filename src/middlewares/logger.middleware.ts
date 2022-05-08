import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, response, Response } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, reponse: Response, next: NextFunction): void {
    const { ip, method, originalUrl } = request;
    const uesrAgent = request.get('user-agent') || '';

    reponse.on('finish', () => {
      const { statusCode } = response;
      const contentLength = reponse.get('content-length');
      this.logger.log(`${method} ${originalUrl} ${statusCode} ${ contentLength} - ${uesrAgent} ${ip}`);
    });
    
    next();
  }
}