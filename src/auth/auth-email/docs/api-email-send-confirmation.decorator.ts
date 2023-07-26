import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { Done } from '@shared/dto/done.dto';

export const ApiEmailSendConfirmation = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiOperation({
      summary: 'Sends email with link to confirm user email/action',
    }),
  );
