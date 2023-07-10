import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from 'src/common/docs/paginate-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export const ApiReviewGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(Review),
    ApiOperation({ summary: 'Get paginated list of review from db' }),
  );
