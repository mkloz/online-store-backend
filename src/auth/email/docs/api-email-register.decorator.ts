import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { TokensDto } from 'src/auth/dto/tokens.dto';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { EmailRegisterDto } from '../dto/email-register.dto';

export const ApiEmailRegister = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Register and returns tokens' }),
    ApiBody({ type: EmailRegisterDto }),
  );
