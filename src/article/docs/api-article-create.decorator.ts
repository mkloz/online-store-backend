import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiArticleCreate = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.CREATED),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Add new article to db. [open for: ADMIN]',
    }),
  );
