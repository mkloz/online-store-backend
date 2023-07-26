import { applyDecorators } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOperation,
} from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { EmailRegisterDto } from '../dto/email-register.dto';
import { Done } from '@shared/dto/done.dto';

export const ApiAdminCreate = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiCreatedResponse(),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Creates new admin(set role ADMIN if exist)' }),
    ApiBody({ type: EmailRegisterDto }),
  );
