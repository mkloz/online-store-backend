import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { File } from '../file.entity';

export const ApiFile = () =>
  applyDecorators(ApiTags('Work with files'), ApiExtraModels(File));
