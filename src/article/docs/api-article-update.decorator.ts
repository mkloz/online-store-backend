import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { Article } from '../entities/article.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiArticleUpdate = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Update an article in db by id. [open for: ADMIN]',
    }),
  );
