import { HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseDataArray = <TModel extends Type<unknown>>(
  model: TModel,
  status = HttpStatus.OK,
) =>
  ApiResponse({
    status,
    schema: {
      properties: {
        data: {
          type: 'array',
          items: { $ref: getSchemaPath(model) },
        },
      },
    },
  });
