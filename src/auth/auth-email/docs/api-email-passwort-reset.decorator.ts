import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { Done } from '@shared/dto/done.dto';

export const ApiEmailPasswortReset = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiOperation({ summary: 'Password changing by token from email' }),
  );
