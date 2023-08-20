import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { HealthIndicatorResult } from '@nestjs/terminus';
import { ApiExceptionResponse } from '@shared/docs/api-exception-response.decorator';

enum HealthCheckStatus {
  ERROR = 'error',
  OK = 'ok',
}
const DB_EXAMPLE: HealthIndicatorResult = { database: { status: 'up' } };
const REDIS_EXAMPLE: HealthIndicatorResult = {
  redis: { status: 'down', message: 'Could not connect' },
};
const COMBINED_EXAMPLE: HealthIndicatorResult = {
  ...DB_EXAMPLE,
  ...REDIS_EXAMPLE,
};

const healthIndicatorSchema = (
  example: HealthIndicatorResult,
): SchemaObject => ({
  type: 'object',
  example,
  additionalProperties: {
    type: 'object',
    properties: {
      status: {
        type: 'string',
      },
    },
    additionalProperties: {
      type: 'string',
    },
  },
});

export function getHealthCheckSchema(status: HealthCheckStatus): SchemaObject {
  return {
    type: 'object',
    properties: {
      status: {
        type: 'string',
        example: status,
      },
      info: {
        ...healthIndicatorSchema(DB_EXAMPLE),
        nullable: true,
      },
      error: {
        ...healthIndicatorSchema(
          status === HealthCheckStatus.ERROR ? REDIS_EXAMPLE : {},
        ),
        nullable: true,
      },
      details: healthIndicatorSchema(
        status === HealthCheckStatus.ERROR ? COMBINED_EXAMPLE : DB_EXAMPLE,
      ),
    },
  };
}

export const HealthCheck = () =>
  applyDecorators(
    ApiOkResponse({
      schema: {
        properties: {
          data: getHealthCheckSchema(HealthCheckStatus.OK),
        },
      },
    }),
    ApiExceptionResponse(
      getHealthCheckSchema(HealthCheckStatus.ERROR),
      HttpStatus.SERVICE_UNAVAILABLE,
    ),
  );
