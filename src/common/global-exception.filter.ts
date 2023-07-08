import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
import { Env } from './dto/dotenv.dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly configServise: ConfigService) {}
  catch(exception: Error, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse<Response>();
    const env = this.configServise.get<string>('env');
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const resp = {
      status,
      name: env === Env.Development ? exception.name : undefined,
      message:
        env === Env.Development ? exception.message : 'Something went wrong',
    };

    res.status(status).send(resp);
  }
}
