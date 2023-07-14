import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Ok } from 'src/common/dto/ok.dto';

export const ApiEmailPasswortReset = () =>
  applyDecorators(
    ApiResponseData(Ok),
    ApiBearerAuth(),
    ApiOkResponse(),
    ApiOperation({ summary: 'Password changing' }),
  );
