import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { TokensDto } from '@auth/dto/tokens.dto';
import { ApiResponseData } from '@shared/docs';
import { EmailRegisterDto } from '../dto/email-register.dto';

export const ApiEmailRegister = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiCreatedResponse(),
    ApiOperation({ summary: 'Register and returns tokens' }),
    ApiBody({ type: EmailRegisterDto }),
  );
