import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { Done } from '@shared/dto/done.dto';

export const ApiEmailPasswordReset = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiOperation({ summary: 'Password changing by token from email' }),
  );

export const ApiEmailPasswordChange = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiBearerAuth(),
    ApiOperation({ summary: 'Password changing by previous one' }),
  );
