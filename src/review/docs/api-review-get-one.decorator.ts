import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';
import { Review } from '../entities/review.entity';

export const ApiReviewGetOne = () =>
  applyDecorators(
    ApiResponseData(Review, HttpStatus.OK),
    ApiOperation({
      summary: 'Get one review from db by id. [open for everyone]',
    }),
  );
