import { HttpStatus, applyDecorators } from '@nestjs/common';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Article } from '../entities/article.entity';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleIncrement = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiOperation({
      summary:
        'Increments views count on article in db by id. [open for everyone]',
    }),
  );
