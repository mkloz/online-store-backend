import { applyDecorators } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { ArticlePhoto } from '../article-photo.entity';

export const ApiGetFile = () =>
  applyDecorators(
    ApiOperation({
      summary: 'Get data about file from db. [open for everyone]',
    }),
    ApiResponseData(ArticlePhoto),
  );
