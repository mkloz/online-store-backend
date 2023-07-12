import { applyDecorators } from '@nestjs/common';
import { LoginDto } from '../dto/login.dto';
import { TokensDto } from '../dto/tokens.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';

export const ApiLogin = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Login and returns tokens' }),
    ApiBody({ type: LoginDto }),
  );
