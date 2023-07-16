import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { TokensDto } from 'src/auth/dto/tokens.dto';

export const ApiEmailConfirm = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Confirm email token and returns jwt tokens' }),
  );
