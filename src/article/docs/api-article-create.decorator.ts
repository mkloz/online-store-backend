import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const ApiArticleCreate = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Add new article to db. [open for: ADMIN]',
    }),
  );
