import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Article } from '../entities/article.entity';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleDelete = () =>
  applyDecorators(
    ApiResponseData(Article),
    ApiOperation({ summary: 'Delete one article from db by id' }),
  );
