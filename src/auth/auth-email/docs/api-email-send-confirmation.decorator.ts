import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { Done } from 'src/common/dto/done.dto';

export const ApiEmailSendConfirmation = () =>
  applyDecorators(
    ApiResponseData(Done),
    ApiOkResponse(),
    ApiOperation({
      summary: 'Sends email with link to confirm user email/action',
    }),
  );
