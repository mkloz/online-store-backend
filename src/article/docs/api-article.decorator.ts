import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Article } from '../entities/article.entity';

export const ApiArticle = () =>
  applyDecorators(ApiTags('Article'), ApiExtraModels(Article));
