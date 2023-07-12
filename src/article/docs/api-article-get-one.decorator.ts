import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleGetOne = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiOperation({
      summary: 'Get one article from db by id. [open for everyone]',
    }),
  );
