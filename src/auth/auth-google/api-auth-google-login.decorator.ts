import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { TokensDto } from '@auth/dto/tokens.dto';

export const ApiAuthGoogleLogin = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Login user by idToken from google' }),
  );
