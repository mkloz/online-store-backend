import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponseDataArray } from 'src/common/docs/data-response-array.decorator';
import { File } from '../file.entity';

export const ApiCreateFiles = () =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Upload file to AWS and save info in db. [open for: ADMIN]',
    }),
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
