import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ApiConfigService } from '@config/api-config.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly cs: ApiConfigService) {}

  catch(exception: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const resp = {
      status,
      name: this.cs.isDevelopment() ? exception.name : undefined,
      message: this.cs.isDevelopment()
        ? exception.message
        : 'Something went wrong',
    };

    res.status(status).send(resp);
  }
}
