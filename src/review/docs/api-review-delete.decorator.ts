import { applyDecorators } from '@nestjs/common';
import { ApiResponseData } from '@shared/docs';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';
import { ApiAdmin } from '@shared/docs/api-admin.decorator';

export const ApiReviewDelete = () =>
  applyDecorators(
    ApiResponseData(Review),
    ApiBearerAuth(),
    ApiAdmin(),
    ApiOperation({
      summary: 'Delete one review from db by id. [open for: ADMIN]',
    }),
  );
