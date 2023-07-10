import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export const ApiReviewDelete = () =>
  applyDecorators(
    ApiResponseData(Review),
    ApiOperation({ summary: 'Delete one review from db by id' }),
  );
