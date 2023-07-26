import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { TokensDto } from '@auth/dto/tokens.dto';
import { Done } from '@shared/dto/done.dto';

export const ApiAuth = () =>
  applyDecorators(ApiTags('Authorization'), ApiExtraModels(TokensDto, Done));
