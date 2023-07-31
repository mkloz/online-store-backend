import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { Article } from '../entities/article.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

export const ApiArticleDelete = () =>
  applyDecorators(
    ApiResponseData(Article),
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Delete one article from db by id. [open for: ADMIN]',
    }),
  );
