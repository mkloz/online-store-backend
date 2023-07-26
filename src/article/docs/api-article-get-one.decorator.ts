import { HttpStatus, applyDecorators } from '@nestjs/common';
import { Article } from '../entities/article.entity';
import { ApiResponseData } from '@shared/docs';
import { ApiOperation } from '@nestjs/swagger';

export const ApiArticleGetOne = () =>
  applyDecorators(
    ApiResponseData(Article, HttpStatus.OK),
    ApiOperation({
      summary: 'Get one article from db by id. [open for everyone]',
    }),
  );
