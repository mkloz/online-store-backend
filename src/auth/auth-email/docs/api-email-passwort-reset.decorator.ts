import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Done } from 'src/common/dto/done.dto';

export const ApiEmailPasswortReset = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiOperation({ summary: 'Password changing by token from email' }),
  );
