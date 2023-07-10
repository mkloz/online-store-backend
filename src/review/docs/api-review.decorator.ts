import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export const ApiReview = () =>
  applyDecorators(ApiTags('Review'), ApiExtraModels(Review));
