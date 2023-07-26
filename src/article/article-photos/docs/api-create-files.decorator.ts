import { HttpStatus, applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponseDataArray } from '@shared/docs';
import { ArticlePhoto } from '../article-photo.entity';

export const ApiCreateFiles = () =>
  applyDecorators(
    ApiConsumes('multipart/form-data'),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Upload file to AWS and save info in db. [open for: ADMIN]',
    }),
    ApiResponseDataArray(ArticlePhoto, HttpStatus.CREATED),
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
