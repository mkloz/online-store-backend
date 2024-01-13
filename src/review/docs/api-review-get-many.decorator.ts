import { applyDecorators } from '@nestjs/common';
import { ApiPaginatedResponse } from '@shared/docs';
import { ApiOperation, ApiPropertyOptional } from '@nestjs/swagger';
import { Review, ReviewDiscription } from '../entities/review.entity';
import { User, UserDiscription } from '@user/user.entity';

export const ApiReviewGetMany = () =>
  applyDecorators(
    ApiPaginatedResponse(Review),
    ApiOperation({
      summary: 'Get paginated list of review from db. [open for everyone]',
    }),
  );
export class ReviewDiscriptionWithAuthor extends ReviewDiscription {
  @ApiPropertyOptional({ type: () => UserDiscription })
  author?: User;
}
export const ApiReviewGetManyForArticle = () =>
  applyDecorators(
    ApiPaginatedResponse(ReviewDiscriptionWithAuthor),
    ApiOperation({
      summary:
        'Get paginated list of review from db for articles. [open for everyone]',
    }),
  );
