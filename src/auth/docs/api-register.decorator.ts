import { applyDecorators } from '@nestjs/common';
import { TokensDto } from '../dto/tokens.dto';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from 'src/common/docs/data-response-api.decorator';
import { RegisterDto } from '../dto/register.dto';

export const ApiRegister = () =>
  applyDecorators(
    ApiResponseData(TokensDto),
    ApiOkResponse(),
    ApiOperation({ summary: 'Register and returns tokens' }),
    ApiBody({ type: RegisterDto }),
  );
