import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { Article } from '../entities/article.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const ApiArticleUpdate = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Update an article in db by id. [open for: ADMIN]',
    }),
  );
