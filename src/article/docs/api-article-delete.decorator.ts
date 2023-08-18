import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { Article } from '../entities/article.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiArticleDelete = () =>
  applyDecorators(
    ApiResponseData(Article),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Delete one article from db by id. [open for: ADMIN]',
    }),
  );
