import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/docs/paginate-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export const ApiCategoryGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(Category),
    ApiOperation({
      summary: 'Get paginated list of categories from db. [open for everyone]',
    }),
  );
