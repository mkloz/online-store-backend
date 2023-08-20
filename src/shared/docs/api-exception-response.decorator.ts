import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

export const ApiExceptionResponse = (
  schema: SchemaObject,
  status = HttpStatus.OK,
) =>
  applyDecorators(
    ApiResponse({
      status,
      schema: {
        type: 'object',
        properties: {
          status: {
            example: status,
            type: 'integer',
            description: 'HTTP status code.',
          },
          message: {
            description: 'Error message.',
            ...schema,
          },
          timestamp: {
            example: '2023-08-20T12:34:56Z',
            type: 'string',
            format: 'date-time',
            description: 'Timestamp when the exception occurred.',
          },
          method: {
            example: 'GET',
            type: 'string',
            description: 'HTTP method that triggered the exception.',
          },
          path: {
            example: '/api/resource',
            type: 'string',
            description: 'Request path that triggered the exception.',
          },
        },
        required: ['status', 'timestamp', 'method'],
      },
    }),
  );
