import { applyDecorators } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { ApiPaginatedResponse } from 'src/common/docs/paginate-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(Article),
    ApiOperation({ summary: 'Get paginated list of article from db' }),
  );
