import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { ArticlePhoto } from '../article-photo.entity';

export const ApiFile = () =>
  applyDecorators(ApiTags('Article photos'), ApiExtraModels(ArticlePhoto));
