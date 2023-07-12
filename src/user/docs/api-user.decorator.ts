import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { User } from '../user.entity';

export const ApiUser = () =>
  applyDecorators(ApiTags('User'), ApiExtraModels(User));
