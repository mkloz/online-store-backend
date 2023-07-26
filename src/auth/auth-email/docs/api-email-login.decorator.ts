import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { EmailLoginDto } from '../dto/email-login.dto';
import { TokensDto } from '@auth/dto/tokens.dto';

export const ApiEmailLogin = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Login and returns tokens' }),
    ApiBody({ type: EmailLoginDto }),
  );
