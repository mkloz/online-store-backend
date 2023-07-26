import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiOperation } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export const ApiCategoryGetOne = () =>
  applyDecorators(
    ApiResponseData(Category, HttpStatus.OK),
    ApiOperation({
      summary: 'Get one category from db by id. [open for everyone]',
    }),
  );
