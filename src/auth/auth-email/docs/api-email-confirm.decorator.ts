import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { TokensDto } from '@auth/dto/tokens.dto';

export const ApiEmailConfirm = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({
      summary:
        'Confirm email token and set status of user email as vefificated',
    }),
  );
