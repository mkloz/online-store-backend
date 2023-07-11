import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';

export const ApiCategoryGetOne = () =>
  applyDecorators(
    ApiResponseData(Category, HttpStatus.OK),
    ApiOperation({ summary: 'Get one category from db by id' }),
  );
