import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';
import { ReviewDiscriptionWithAuthor } from './api-review-get-many.decorator';

export const ApiReview = () =>
  applyDecorators(
    ApiTags('Review'),
    ApiExtraModels(Review, ReviewDiscriptionWithAuthor),
  );
