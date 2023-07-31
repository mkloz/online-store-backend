import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from '@shared/docs';
import { ApiOperation } from '@nestjs/swagger';
import { CategoryDiscription } from '../entities/category.entity';

export const ApiCategoryGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(CategoryDiscription),
    ApiOperation({
      summary: 'Get paginated list of categories from db. [open for everyone]',
    }),
  );
