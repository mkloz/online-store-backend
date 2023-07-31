import { applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { ApiResponseData } from '@shared/docs';
import { User } from '../user.entity';

export const ApiUserById = () =>
  applyDecorators(
    ApiBearerAuth(),
    ApiOperation({
      summary: 'Get information about user by id. [open for: ADMIN]',
    }),
    ApiResponseData(User),
  );
