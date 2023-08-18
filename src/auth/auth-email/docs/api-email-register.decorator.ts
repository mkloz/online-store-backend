import { applyDecorators } from '@nestjs/common';
import { ApiBody, ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { EmailRegisterDto } from '../dto/email-register.dto';
import { User } from '@user/user.entity';

export const ApiEmailRegister = () =>
  applyDecorators(
    ApiResponseData(User),
    ApiCreatedResponse(),
    ApiOperation({ summary: 'Register and returns tokens' }),
    ApiBody({ type: EmailRegisterDto }),
  );
