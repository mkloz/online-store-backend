import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { EmailLoginDto } from '../dto/email-login.dto';
import { TokensDto } from 'src/auth/dto/tokens.dto';

export const ApiEmailLogin = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Login and returns tokens' }),
    ApiBody({ type: EmailLoginDto }),
  );
