import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiOperation } from '@nestjs/swagger';
import { ApiResponseDataArray } from 'src/common/docs/data-response-array.decorator';
import { File } from '../file.entity';

export const ApiCreateFiles = () =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiOperation({ summary: 'Upload file' }),
    ApiResponseDataArray(File, HttpStatus.CREATED),
    ApiBody({
      schema: {
        type: 'object',
        properties: {
          files: {
            type: 'array',
            items: {
              type: 'file',
              format: 'binary',
            },
          },
        },
      },
    }),
  );
