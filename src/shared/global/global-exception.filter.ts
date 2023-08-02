import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpServer,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response, Request } from 'express';
import { ApiConfigService } from '@config/api-config.service';
import { AbstractHttpAdapter, HttpAdapterHost } from '@nestjs/core';
import { isObject } from '@nestjs/common/utils/shared.utils';

const UNKNOWN_EXCEPTION_MESSAGE = 'Something went wrong';
interface IHTTPException {
  status: number;
  message: string;
  timestamp: string;
  method: string;
  path?: string;
}
@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly cs: ApiConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>();

    const { httpAdapter } = this.httpAdapterHost;

    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, httpAdapter);
    }

    const status = exception.getStatus();

    const resp: IHTTPException = {
      status,
      message: this.cs.isProduction()
        ? status === HttpStatus.NOT_FOUND
          ? 'Not found'
          : UNKNOWN_EXCEPTION_MESSAGE
        : exception.message,
      timestamp: new Date().toISOString(),
      method: httpAdapter.getRequestMethod(req),
      path: !this.cs.isProduction()
        ? httpAdapter.getRequestUrl(req)
        : undefined,
    };

    httpAdapter.reply(
      host.switchToHttp().getResponse<Response>(),
      resp,
      status,
    );
  }

  public handleUnknownError(
    exception: Error,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter | HttpServer,
  ) {
    const body = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: UNKNOWN_EXCEPTION_MESSAGE,
    };

    const response = host.switchToHttp().getRequest();

    if (!applicationRef.isHeadersSent(response)) {
      applicationRef.reply(response, body, body.statusCode);
    } else {
      applicationRef.end(response);
    }

    return Logger.error(
      exception.message,
      this.isExceptionObject(exception) ? exception.stack : undefined,
      'ExceptionFilter',
    );
  }

  public isExceptionObject(err: unknown): err is Error {
    return !!(
      isObject(err) &&
      typeof err === 'object' &&
      'message' in err &&
      err?.message
    );
  }

  public isHttpError(
    err: Error,
  ): err is { statusCode: number; message: string; name: string } {
    return !!(err && 'statusCode' in err && err?.statusCode && err?.message);
  }
}
