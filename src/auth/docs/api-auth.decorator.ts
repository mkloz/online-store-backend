import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { TokensDto } from 'src/auth/dto/tokens.dto';
import { Ok } from 'src/common/dto/ok.dto';

export const ApiAuth = () =>
  applyDecorators(ApiTags('Authorization'), ApiExtraModels(TokensDto, Ok));
