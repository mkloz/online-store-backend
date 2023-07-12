import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { File } from '../file.entity';

export const ApiGetFile = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get data about file from db. [open for everyone]',
    }),
    ApiResponseData(File),
  );
