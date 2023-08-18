import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';
import { TokensDto } from '@auth/dto/tokens.dto';
import { User } from '@user/user.entity';
import { Done } from '@shared/dto';

export const ApiEmail = () =>
  applyDecorators(
    ApiTags('Authorization'),
    ApiExtraModels(TokensDto, Done, User),
  );
