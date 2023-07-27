import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { CategoryDiscription } from '../entities/category.entity';

export const ApiCategory = () =>
  applyDecorators(ApiTags('Category'), ApiExtraModels(CategoryDiscription));
