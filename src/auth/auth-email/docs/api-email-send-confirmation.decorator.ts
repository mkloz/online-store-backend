import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Ok } from 'src/common/dto/ok.dto';

export const ApiEmailSendConfirmation = () =>
  applyDecorators(
    ApiResponseData(Ok),
    ApiOkResponse(),
    ApiOperation({
      summary: 'Sends email with link to confirm user email/action',
    }),
  );
