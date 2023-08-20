import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { Info } from '@shared/dto';

export const ApiApp = () =>
  applyDecorators(ApiTags('Root'), ApiExtraModels(Info));
