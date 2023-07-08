import { HttpStatus, Type } from '@nestjs/common';
import { ApiResponse, getSchemaPath } from '@nestjs/swagger';

export const ApiResponseData = <TModel extends Type<unknown>>(
  model: TModel,
  status = HttpStatus.OK,
) =>
  ApiResponse({
    status,
    schema: {
      properties: {
        data: { $ref: getSchemaPath(model) },
      },
    },
  });
