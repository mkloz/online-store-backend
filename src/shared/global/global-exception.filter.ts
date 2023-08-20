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

export class ExceptionResponse {
  status: number;
  message?: unknown;
  timestamp: string;
  method: string;
  path?: string;
  constructor(data: Partial<ExceptionResponse>) {
    Object.assign(this, data);
  }
}
const UNKNOWN_EXCEPTION_MESSAGE = 'Something went wrong';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly cs: ApiConfigService,
    private readonly httpAdapterHost: HttpAdapterHost,
  ) {}

  catch(exception: Error, host: ArgumentsHost) {
    const req = host.switchToHttp().getRequest<Request>();
    const { httpAdapter } = this.httpAdapterHost;
    const resp: ExceptionResponse = new ExceptionResponse({
      timestamp: new Date().toISOString(),
      method: httpAdapter.getRequestMethod(req),
      path: !this.cs.isProduction()
        ? httpAdapter.getRequestUrl(req)
        : undefined,
    });

    if (!(exception instanceof HttpException)) {
      return this.handleUnknownError(exception, host, httpAdapter, resp);
    }

    resp.status = exception.getStatus();
    resp.message = this.cs.isProduction()
      ? resp.status === HttpStatus.NOT_FOUND
        ? 'Not found'
        : UNKNOWN_EXCEPTION_MESSAGE
      : exception.getResponse();

    httpAdapter.reply(
      host.switchToHttp().getResponse<Response>(),
      resp,
      resp.status,
    );
  }

  public handleUnknownError(
    exception: Error,
    host: ArgumentsHost,
    applicationRef: AbstractHttpAdapter | HttpServer,
    resp: ExceptionResponse,
  ) {
    resp.status = HttpStatus.INTERNAL_SERVER_ERROR;
    resp.message = UNKNOWN_EXCEPTION_MESSAGE;

    const response = host.switchToHttp().getRequest();

    if (!applicationRef.isHeadersSent(response)) {
      applicationRef.reply(response, resp, resp.status);
    } else {
      applicationRef.end(response);
    }

    return Logger.error(
      exception.message,
      this.isErrorObject(exception) ? exception.stack : undefined,
      'ExceptionFilter',
    );
  }

  public isErrorObject(err: unknown): err is Error {
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
